# T-004 · Agregar CI que corra verify.sh en cada PR
- Estado: Lista · Prioridad: P0 · Esfuerzo: S · Ejecuta: 🧠 modelo de frontera
- Fase: P0 Estabilizar
- Rama: `ci/T-004-ci-verify` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-001, T-003 · Spec/ADR: —
- Revisa: 🧠 modelo de frontera (sesión nueva) + 👤 dueño
- Título del PR: `ci: run verify script on pull requests`

## Por qué
No hay CI (auditoría §6): nada impide mergear algo roto y la protección de `main` (T-015) necesita un check requerido.

## Objetivo
Workflow `CI` con jobs `server` y `client` que corren `./scripts/verify.sh --server|--client` en `push` a `main` y en `pull_request`, en verde.

## Alcance
- Incluye: `.github/workflows/ci.yml`, caché de Maven y npm, logs y reporte como artefacto, badge en el README.
- **No incluye:** E2E (T-013), Dependabot (T-014), deploy, cambios en la app.

## Leer antes
- `scripts/verify.sh` · `docker-compose.yml` (servicio `db`) · `CONTRIBUTING.md` §3

## Archivos previstos
- crear: `.github/workflows/ci.yml` · modificar: `README.md` (badge), `docs/STATUS.md` (fila "CI en main")

## YAML propuesto
Antes de usarlo, confirmá la última versión mayor de cada action (`actions/checkout`, `setup-java`, `setup-node`, `upload-artifact`).
```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request:
concurrency: { group: ci-${{ github.ref }}, cancel-in-progress: true }
jobs:
  server:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: '21', cache: maven, cache-dependency-path: backend/AwareGaming/pom.xml }
      - run: ./scripts/verify.sh --server
      - if: always()
        uses: actions/upload-artifact@v4
        with: { name: server-logs, path: .verify-logs/ }
  client:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version-file: .nvmrc, cache: npm, cache-dependency-path: frontend/package-lock.json }
      - run: ./scripts/verify.sh --client
      - if: always()
        uses: actions/upload-artifact@v4
        with: { name: client-logs, path: .verify-logs/ }
```

## Tests
- El workflow en sí es la prueba: tiene que pasar en el PR. Probá además que falla: un commit temporal con un error de lint en la rama (después revertido) → job `client` en rojo.

## Criterios de aceptación
- [ ] En el PR, los checks `CI / server` y `CI / client` en verde.
- [ ] Un fallo provocado y revertido dejó el job en rojo (link en las notas).
- [ ] Badge de CI en el README apuntando a `actions/workflows/ci.yml`.
- [ ] `docs/STATUS.md` → fila "CI en main" actualizada.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Pendientes → T-014, T-015
