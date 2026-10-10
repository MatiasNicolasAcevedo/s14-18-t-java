#!/usr/bin/env bash
# Entorno de desarrollo: PostgreSQL en contenedor + backend y frontend locales con hot reload.
# Uso: ./scripts/dev.sh          levanta todo; Ctrl+C corta back y front
#      ./scripts/dev.sh --down   apaga la base (los datos quedan en el volumen)
# Hace lo mismo que la "Opción B" del README. Logs en .dev-logs/ (ignorado por git).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVER_DIR="$ROOT/backend/AwareGaming"
CLIENT_DIR="$ROOT/frontend"
LOGS="$ROOT/.dev-logs"

if [ "${1:-}" = "--down" ]; then
  (cd "$ROOT" && docker compose down)
  exit 0
fi

mkdir -p "$LOGS"

copy_if_missing() {
  if [ ! -f "$2" ]; then cp "$1" "$2"; echo "· Copiado ${1#"$ROOT"/} -> ${2#"$ROOT"/}"; fi
}
copy_if_missing "$SERVER_DIR/src/main/resources/env.properties.example" "$SERVER_DIR/src/main/resources/env.properties"
copy_if_missing "$CLIENT_DIR/.env.local.example" "$CLIENT_DIR/.env.local"

wait_http() { # url, segundos, nombre
  local i
  for ((i = 0; i < $2; i++)); do
    if curl -s -o /dev/null "$1"; then return 0; fi
    sleep 1
  done
  echo "❌ $3 no respondió en $2 s. Ver $LOGS/" >&2
  return 1
}

# Cada proceso en su propio grupo (job control) para cortar todo el árbol: mvnw -> java, npm -> sh -> node
set -m
PIDS=()
cleanup() {
  trap - INT TERM EXIT
  echo
  echo "· Cortando back y front…"
  for pid in ${PIDS[@]+"${PIDS[@]}"}; do kill -TERM -- "-$pid" 2>/dev/null || true; done
  wait 2>/dev/null || true
  echo "· Listo. La base sigue levantada (apagala con: ./scripts/dev.sh --down)"
}
trap cleanup INT TERM EXIT

echo "· Levantando la base (docker compose up -d --wait)…"
(cd "$ROOT" && docker compose up -d --wait)

echo "· Backend: ./mvnw spring-boot:run (log: .dev-logs/server.log)…"
(cd "$SERVER_DIR" && exec ./mvnw -B spring-boot:run) >"$LOGS/server.log" 2>&1 &
PIDS+=($!)
wait_http "http://localhost:8080/v3/api-docs" 240 "El backend"
echo "  ✅ Backend arriba"

if [ ! -d "$CLIENT_DIR/node_modules" ]; then
  echo "· Instalando dependencias del front…"
  (cd "$CLIENT_DIR" && npm install --no-audit --no-fund) >"$LOGS/client-install.log" 2>&1
fi
echo "· Frontend: npm run dev (log: .dev-logs/client.log)…"
(cd "$CLIENT_DIR" && exec npm run dev -- --port 5173 --strictPort) >"$LOGS/client.log" 2>&1 &
PIDS+=($!)
wait_http "http://localhost:5173" 60 "El frontend"

cat <<EOF

  ✅ Todo arriba
  Front:    http://localhost:5173
  API:      http://localhost:8080/v1/api
  Swagger:  http://localhost:8080/swagger-ui/index.html
  Usuario demo (seed): monicavelarde@gmail.com / user1
  Ctrl+C para cortar back y front.
EOF
wait
