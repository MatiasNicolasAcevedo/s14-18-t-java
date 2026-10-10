# T-006 · Autorizar por rol y por dueño en la API
- Estado: Lista · Prioridad: P0 🔴 · Esfuerzo: M · Ejecuta: 🧠 modelo de frontera
- Fase: P0 Estabilizar
- Rama: `fix/T-006-server-authorization` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-005 · Spec/ADR: crea `docs/adr/0002-authorization-model.md`
- Revisa: 🧠 modelo de frontera (sesión nueva) + 👤 dueño
- Título del PR: `fix(server): enforce role and ownership authorization`

## Por qué
Cualquier usuario autenticado lista DNI y email de todos (`GET /v1/api/user/all`), edita o desactiva a otros (`PUT/DELETE /user/{id}`), se suma créditos sin límite (`POST /user/credits`, probe: +1.000.000 → 200), crea o borra juegos y edita o borra posts ajenos. Evidencia: `UserController.java:24-67`, `GameController.java:32-40`, `PostsController.java:44-74`, `RecordByGameController.java:28` (auditoría §6 "Seguridad").

## Objetivo
Cada endpoint tiene una regla explícita (público, usuario, dueño o `ADMIN`), con tests que fallan si se rompe.

## Alcance
- Incluye: `@EnableMethodSecurity` + `@PreAuthorize` o reglas en `SecurityConfig`; prefijo `ROLE_` coherente con `User.getAuthorities()`; chequeo de dueño en `PUT /user/{id}` y posts; `/user/all`, `/user/{id}` (ajeno), `/credits-by-id`, `POST/DELETE /game`, `/record-game/all`, `/comment/all` solo `ADMIN`; quitar `POST /user/credits` para usuarios comunes (decisión en el ADR); 401 sin token (entry point); usuario `ADMIN` en el seed para probar.
- **No incluye:** manejo global de errores (T-009), validación de apuestas (T-008), cambios de UI.

## Leer antes
- `config/SecurityConfig.java` · `model/User.java:60-63` · `controller/UserController.java` · `controller/PostsController.java` · ADR template

## Archivos previstos
- modificar: `SecurityConfig.java`, `User.java`, controllers afectados, `UserService.java`, `PostsService.java`, `DataLoader.java` (admin), `docs/ARCHITECTURE.md` (tabla de endpoints) · crear: tests `@WebMvcTest` por controller con `@WithMockUser(roles=…)`, ADR 0002

## Tests
- Por cada regla: usuario común → 403, dueño → 200, admin → 200, sin token → 401.
- Integración: un usuario no puede editar a otro (PUT `/user/{otroId}` → 403).

## Criterios de aceptación
- [ ] Los probes de seguridad de la auditoría §4 dan el status esperado (`/user/all` como USER → 403; `/user/credits` → 403/404 según el ADR).
- [ ] `./scripts/verify.sh` en verde y la cobertura no baja.
- [ ] La UI actual (perfil, editar perfil, ruleta) sigue funcionando (smoke manual con `dev.sh`).

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Tests agregados: … · Pendientes → …
