#!/usr/bin/env bash
# Gate rápido del proyecto: build (con clean) + lint + tests de cada parte.
# Uso: ./scripts/verify.sh [--server] [--client]   (sin opciones: ambas partes)
# Sale con código != 0 si algo falla. Detalle en .verify-logs/ (ignorado por git).
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVER_DIR="$ROOT/backend/AwareGaming"
CLIENT_DIR="$ROOT/frontend"
LOGS="$ROOT/.verify-logs"
mkdir -p "$LOGS"

RUN_SERVER=0; RUN_CLIENT=0
for arg in "$@"; do
  case "$arg" in
    --server) RUN_SERVER=1 ;;
    --client) RUN_CLIENT=1 ;;
    -h|--help) sed -n '2,4p' "$0"; exit 0 ;;
    *) echo "Opción desconocida: $arg" >&2; exit 2 ;;
  esac
done
if [ $RUN_SERVER -eq 0 ] && [ $RUN_CLIENT -eq 0 ]; then RUN_SERVER=1; RUN_CLIENT=1; fi

FAILED=0
SUMMARY=()

# Usa el archivo real si existe; si no, copia el .example (valores válidos para local)
ensure_config() {
  local example="$1" real="$2"
  if [ ! -f "$real" ]; then
    cp "$example" "$real"
    echo "· Copiado ${example#"$ROOT"/} -> ${real#"$ROOT"/}"
  fi
}

verify_server() {
  local log="$LOGS/server.log" s="server:"
  ensure_config "$SERVER_DIR/src/main/resources/env.properties.example" \
                "$SERVER_DIR/src/main/resources/env.properties"

  # Los tests levantan el contexto completo contra PostgreSQL (hasta que haya Testcontainers: T-005)
  if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
    echo "· Levantando la base (docker compose up -d --wait db)…"
    if ! (cd "$ROOT" && docker compose up -d --wait db) >"$LOGS/db.log" 2>&1; then
      echo "  ❌ No se pudo levantar la base. Ver .verify-logs/db.log"
    fi
  else
    echo "  ⚠️  Docker no está disponible: los tests van a fallar si no hay PostgreSQL en localhost:5432"
  fi

  local jdk
  jdk=$(java -version 2>&1 | grep -m1 -Eo 'version "[0-9]+' | grep -Eo '[0-9]+$' || echo "?")
  echo "· Backend: ./mvnw -B clean verify (JDK $jdk)…"
  if (cd "$SERVER_DIR" && ./mvnw -B clean verify) >"$log" 2>&1; then
    local tests
    tests=$(grep -E 'Tests run: [0-9]+, Failures' "$log" | tail -1 | grep -Eo 'Tests run: [0-9]+' | grep -Eo '[0-9]+')
    s="$s ✅ build ✅ tests (${tests:-0}) [JDK $jdk]"
  else
    FAILED=1
    if grep -q 'Tests run:.*\(Failures: [1-9]\|Errors: [1-9]\)' "$log"; then
      local failing
      failing=$(grep -E '^\[ERROR\]   [A-Za-z]' "$log" | head -3 | sed 's/^\[ERROR\] *//' | tr '\n' ';')
      s="$s ✅ build ❌ tests (${failing:-ver log}) [JDK $jdk]"
      if grep -q 'Connection refused\|Connection to localhost:5432' "$log"; then
        echo "  Pista: la base no responde. Probá: docker compose up -d --wait"
      fi
    else
      s="$s ❌ build [JDK $jdk]"
      grep -m5 -E '^\[ERROR\]' "$log" | sed 's/^/  /'
      if grep -q 'release version\|invalid target release\|UnsupportedClassVersion' "$log"; then
        echo "  Pista: versión de JDK incompatible. Usá JDK 21 (sdk env install)."
      fi
    fi
    echo "  Detalle: .verify-logs/server.log"
  fi
  SUMMARY+=("$s")
}

verify_client() {
  local s="client:"
  ensure_config "$CLIENT_DIR/.env.local.example" "$CLIENT_DIR/.env.local"
  echo "· Frontend: Node $(node -v 2>/dev/null || echo '?')"

  if [ ! -d "$CLIENT_DIR/node_modules" ]; then
    echo "· Instalando dependencias…"
    local install="npm install --no-audit --no-fund"
    [ -f "$CLIENT_DIR/package-lock.json" ] && install="npm ci --no-audit --no-fund"
    if ! (cd "$CLIENT_DIR" && $install) >"$LOGS/client-install.log" 2>&1; then
      FAILED=1; SUMMARY+=("$s ❌ install (ver .verify-logs/client-install.log)"); return
    fi
  fi

  echo "· npm run lint…"
  if (cd "$CLIENT_DIR" && npm run lint) >"$LOGS/client-lint.log" 2>&1; then
    s="$s ✅ lint"
  else
    FAILED=1
    local n
    n=$(grep -Eo '\([0-9]+ errors?' "$LOGS/client-lint.log" | tail -1 | tr -d '(')
    s="$s ❌ lint (${n:-ver log})"
    grep -E '^\s+[0-9]+:[0-9]+\s+error' "$LOGS/client-lint.log" | head -3 | sed 's/^/  /'
  fi

  echo "· npm run build…"
  if (cd "$CLIENT_DIR" && npm run build) >"$LOGS/client-build.log" 2>&1; then
    s="$s ✅ build"
  else
    FAILED=1; s="$s ❌ build"
    grep -m5 -E 'error' "$LOGS/client-build.log" | sed 's/^/  /'
  fi

  # Todavía no hay infraestructura de tests de front (T-011)
  if grep -q '"test"' "$CLIENT_DIR/package.json"; then
    echo "· npm test…"
    if (cd "$CLIENT_DIR" && npm test -- --run) >"$LOGS/client-test.log" 2>&1; then
      s="$s ✅ tests"
    else
      FAILED=1; s="$s ❌ tests (ver .verify-logs/client-test.log)"
    fi
  else
    s="$s ⚪ tests (no hay: T-011)"
  fi
  SUMMARY+=("$s")
}

[ $RUN_SERVER -eq 1 ] && verify_server
[ $RUN_CLIENT -eq 1 ] && verify_client

echo
RESUMEN=""
for part in "${SUMMARY[@]}"; do RESUMEN="${RESUMEN:+$RESUMEN · }$part"; done
echo "Resumen: $RESUMEN"
exit $FAILED
