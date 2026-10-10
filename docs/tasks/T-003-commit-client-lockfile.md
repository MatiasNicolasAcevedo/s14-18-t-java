# T-003 · Commitear el lockfile del front
- Estado: Lista · Prioridad: P0 · Esfuerzo: S · Ejecuta: 🤖 agente gratuito
- Fase: P0 Estabilizar
- Rama: `build/T-003-client-lockfile` (crearla desde `main` actualizado antes del primer commit) · Depende de: — · Spec/ADR: —
- Revisa: 🤖 agente gratuito (chat nuevo)
- Título del PR: `build(client): commit package-lock.json`

## Por qué
`frontend/.gitignore:14` ignora `package-lock.json`: cada `npm install` resuelve versiones distintas (no reproducible, CI imposible de cachear; auditoría §6 "Versiones y dependencias").

## Objetivo
`package-lock.json` versionado; `npm ci` funciona desde un clon limpio con Node 24.

## Alcance
- Incluye: quitar `package-lock.json` de `frontend/.gitignore`, generar el lockfile con Node 24 sin cambiar `package.json`, usar `npm ci` en `frontend/Dockerfile.dev` y borrar su comentario "Hoy no hay lockfile".
- **No incluye:** actualizar dependencias (`npm update`, `npm audit fix`), cambiar `package.json`.

## Leer antes
- `frontend/.gitignore`, `frontend/Dockerfile.dev`, `scripts/verify.sh:84-91` (ya usa `npm ci` si hay lockfile)

## Archivos previstos
- modificar: `frontend/.gitignore`, `frontend/Dockerfile.dev`, `frontend/README.md` (quitar "hoy no hay lockfile") · crear: `frontend/package-lock.json`

## Tests
- Sin tests nuevos: es build. Verificación por comando.

## Pasos sugeridos
1. `node -v` → v24 (`nvm use`). 2. Borrar la línea `package-lock.json` de `frontend/.gitignore`. 3. `rm -rf node_modules && npm install --no-audit --no-fund` (desde `frontend/`). 4. Cambiar en el Dockerfile.dev `COPY package.json package-lock.json* ./` + `npm install` por `COPY package.json package-lock.json ./` + `RUN npm ci --no-audit --no-fund`. 5. Commitear el lockfile (no lo abras: es enorme).

## Criterios de aceptación
- [ ] `git ls-files frontend/package-lock.json` lo lista.
- [ ] `rm -rf frontend/node_modules && ./scripts/verify.sh --client` en verde (usa `npm ci`).
- [ ] `docker compose --profile app up -d --build --wait` levanta `client` (y `docker compose --profile app down -v` después).
- [ ] `git diff main --stat -- frontend/package.json` vacío.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Tests agregados: — · Pendientes → …
