# Tablero
> Reglas: **una tarea a la vez** (máx. 1 PR de tarea abierto) · "Listas" es la **cola en orden de ejecución**: se toma siempre la primera ·
> si la primera no te corresponde (🧠 o 👤), no saltees a la siguiente: avisá con el formato de "Traspasos" y terminá ·
> las 👤 que no bloquean nada van al final de "Listas" con "(no bloquea la cola)" ·
> formato: `- T-NNN · Pn · S/M/L · 🤖 gratuito|🧠 frontera|👤 dueño · Título → [tarea](tasks/T-NNN-slug.md)`
> Próximo ID libre: T-018

## 🔨 En curso / en revisión (con su PR)
- T-000 · P0 · L · 🧠 frontera · Bootstrap del harness y auditoría inicial → [tarea](tasks/T-000-agent-bootstrap.md) · PR [#2](https://github.com/MatiasNicolasAcevedo/s14-18-t-java/pull/2) (esperando revisión de 🧠 + merge de 👤)

## ✅ Listas (cola en orden de ejecución, máx. 10)
1. T-001 · P0 · S · 🤖 gratuito · Dejar el lint del front en verde → [tarea](tasks/T-001-fix-client-lint-errors.md)
2. T-002 · P0 · S · 🤖 gratuito · Arreglar las rutas de auth del front (login UI) → [tarea](tasks/T-002-fix-client-auth-endpoints.md)
3. T-003 · P0 · S · 🤖 gratuito · Commitear el lockfile del front → [tarea](tasks/T-003-commit-client-lockfile.md)
4. T-004 · P0 · S · 🧠 frontera · Agregar CI que corra verify.sh → [tarea](tasks/T-004-add-ci-workflow.md)
5. T-005 · P0 · M · 🧠 frontera · Infra de tests del back (JaCoCo, Testcontainers) → [tarea](tasks/T-005-server-test-infra.md)
6. T-006 · P0 🔴 · M · 🧠 frontera · Autorizar por rol y por dueño → [tarea](tasks/T-006-server-authorization.md)
7. T-007 · P0 🔴 · M · 🧠 frontera · Secreto JWT y CORS por entorno; env.properties fuera del jar → [tarea](tasks/T-007-server-security-config.md)
8. T-009 · P0 · M · 🧠 frontera · Manejo global de errores y códigos HTTP → [tarea](tasks/T-009-server-error-handling.md)
9. T-008 · P0 🔴 · M · 🤖 gratuito · Validar apuestas de ruleta y dados → [tarea](tasks/T-008-validate-bet-requests.md)
10. T-010 · P0 🔴 · S · 👤 dueño · Rotar credenciales de mail filtradas (no bloquea la cola, **urgente**) → [tarea](tasks/T-010-rotate-leaked-mail-credentials.md)

## ⛔ Bloqueadas (en el orden en que entrarán a la cola)
- T-012 · P0 · S · 🤖 gratuito · Caracterizar registro y comentarios por dueño → [tarea](tasks/T-012-characterize-auth-and-comments.md) · bloqueada por: T-005
- T-016 · P0 · S · 🤖 gratuito · Host/puerto SMTP configurables; borrar `.env_example` → [tarea](tasks/T-016-externalize-mail-config.md) · bloqueada por: T-007
- T-011 · P0 · M · 🧠 frontera · Infra de tests del front (Vitest + RTL + MSW) → [tarea](tasks/T-011-client-test-infra.md) · bloqueada por: T-003, T-004
- T-013 · P0 · M · 🧠 frontera · Smoke E2E con Playwright → [tarea](tasks/T-013-e2e-smoke-infra.md) · bloqueada por: T-002, T-004, T-011
- T-014 · P0 · S · 🧠 frontera · Activar Dependabot → [tarea](tasks/T-014-add-dependabot.md) · bloqueada por: T-004
- T-015 · P0 · S · 👤 dueño · Proteger `main` y limpiar ramas → [tarea](tasks/T-015-protect-main-branch.md) · bloqueada por: T-004
- T-017 · P0 · S · 👤 dueño · Actualizar configuración de producción → [tarea](tasks/T-017-update-prod-config.md) · bloqueada por: T-002, T-007

## 📥 Backlog (sin refinar)
### P0 Estabilizar
- Testabilidad de `GameService`: inyectar `RandomGenerator` y `Clock`; caracterizar los 13 pagos de la ruleta (🧠 → luego 🤖)
- Caracterizar `UserService.updateUser`, recarga diaria `rechargeCredits` e historial `RecordByGameService` (🤖, tras T-005)
- Login fallido en el front: mostrar el error y no navegar (tras T-009)
### P1 Actualizar
- Spring Boot 3.2 → 3.5.16 → 4.1 (evaluar OpenRewrite `UpgradeSpringBoot_4_0`) · Java 21 de target · jjwt 0.13 · springdoc acorde (🧠)
- Flyway en lugar de `ddl-auto=update` (ADR) (🧠)
- Quitar `mysql-connector-j` y `swagger-models` sobrantes; `postgresql` sin versión fija (🤖)
- `@Transactional` y bloqueo optimista en créditos (ruleta, dados, recarga diaria) (🧠)
- Actuator `/actuator/health` para healthchecks (compose, CI, Render) (🧠)
- Mailpit en el compose para probar el soporte en local (🧠)
- Front: Vite 5 → 8 + plugin SWC 4 → React 19 → router 7 (CVE) → ESLint flat config → TypeScript; Tailwind 4 + DaisyUI 5 aparte (🧠 por pasos)
- Dockerfile de prod con imágenes vigentes (`eclipse-temurin`) y `.dockerignore` (🧠)
### P2 Terminar
- Spec foro: conectar posts y comentarios a la API; recompensas por participar
- Spec soporte: formulario en la UI y guardar `SupportContact`
- Spec Dice Aware: UI, registro en `RecordByGame`, pago correcto según tipo (hoy 36× para `TOTAL`)
- Estadísticas reales de tiempo jugado (hoy `TimeChart` con datos fijos)
- Historial de jugadas en la UI (`GET /record-game`)
- DTOs para `Game` y `SupportContact` (no exponer entidades); borrar `UserData.java`, `DemoController` y el matcher `/v1/api/render/*`
### P3 Pulir
- Responsive: scroll horizontal en landing (375/768 px) y login (375 px); menú mobile
- Accesibilidad: `alt` en imágenes de la landing, `<label for>` en login y registro, foco visible, contraste
- README con capturas actuales y GIF, badges de CI y cobertura, licencia (propuesta: MIT, decide 👤)
- Demo online verificada y documentada; release `v1.0.0`
- Spotless/Checkstyle en el back; logging en lugar de `printStackTrace`; typo `loggin.pattern.dateforma`
- Headers de seguridad y rate limit en login; evaluar cookie httpOnly en lugar de `localStorage`
- Code splitting del front (chunk de 657 kB)

## 🏁 Hecho reciente (máx. 10)
- (vacío)
