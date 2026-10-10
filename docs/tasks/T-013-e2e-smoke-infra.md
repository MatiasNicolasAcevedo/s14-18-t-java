# T-013 · Smoke E2E con Playwright (local y CI)
- Estado: Bloqueada (por T-002, T-004) · Prioridad: P0 · Esfuerzo: M · Ejecuta: 🧠 modelo de frontera
- Fase: P0 Estabilizar
- Rama: `test/T-013-e2e-smoke` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-002, T-004, T-011 · Spec/ADR: —
- Revisa: 🧠 modelo de frontera (sesión nueva) + 👤 dueño
- Título del PR: `test(e2e): add playwright smoke tests`

## Por qué
Ningún test recorre la app de punta a punta; el login de la UI estuvo roto meses sin que nada fallara (auditoría §4 y §7).

## Objetivo
`./scripts/e2e.sh` levanta el stack (`docker compose --profile app up -d --build --wait`), corre Playwright en 1280 y 375 px y lo baja; job `e2e` en CI.

## Alcance
- Incluye: proyecto Playwright (en `e2e/` o `frontend/e2e/`, decidir y documentar), 3 smoke tests (landing carga sin scroll horizontal a 1280; login con seed → perfil; ruleta con apuesta `COLOR` 10 → cambia el saldo), screenshots y trazas en fallo como artefacto, `scripts/e2e.sh`, job en `ci.yml`, `docs/TESTING.md`, README.
- **No incluye:** arreglar el responsive (P3: el test a 375 px de la landing queda marcado como conocido o se limita a login).

## Criterios de aceptación
- [ ] `./scripts/e2e.sh` en verde desde un clon limpio (solo Docker y Node).
- [ ] Job `CI / e2e` en verde en el PR, con trazas como artefacto en fallos.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Pendientes → …
