# T-009 · Manejo global de errores y códigos HTTP correctos
- Estado: Lista · Prioridad: P0 · Esfuerzo: M · Ejecuta: 🧠 modelo de frontera
- Fase: P0 Estabilizar
- Rama: `fix/T-009-server-error-handling` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-005 · Spec/ADR: —
- Revisa: 🧠 modelo de frontera (sesión nueva) + 👤 dueño
- Título del PR: `fix(server): return problem details with correct status codes`

## Por qué
Probes de la auditoría §4: login con password incorrecta → **200** con token `null`; JSON inválido → 403; `GET /user/9999` → 403; `GET /posts/get/9999` → 500; `GET /game/9999` → 200 vacío; sin token → 403. Causa: no hay `@RestControllerAdvice`, `/error` está protegido y no hay `AuthenticationEntryPoint`.

## Objetivo
Errores en formato `ProblemDetail` (RFC 9457) con 400/401/403/404/409 según corresponda, y una excepción de "request inválido" reutilizable (la usa T-008).

## Alcance
- Incluye: `@RestControllerAdvice` (validación → 400 con errores por campo; JSON ilegible → 400; no encontrado → 404; credenciales → 401; acceso denegado → 403; créditos insuficientes → 409); `permitAll` de `/error`; entry point 401; `AuthController.login` → 401 si no hay token; servicios que hoy devuelven `null`/`orElseThrow()` sin tipo → excepción de "no encontrado"; front: `services/*.ts` tratan 401 igual que hoy tratan 403; documentar el formato en `docs/ARCHITECTURE.md`.
- **No incluye:** autorización por rol (T-006), validaciones de apuestas (T-008), rediseño de respuestas exitosas.

## Leer antes
- `auth/AuthController.java`, `auth/AuthService.java:35-54` · `config/SecurityConfig.java` · `controller/PostsController.java` · `service/GameService.java:41-43` · `frontend/src/services/auth.services.ts`

## Archivos previstos
- crear: `exceptions/GlobalExceptionHandler.java`, `exceptions/NotFoundException.java`, `exceptions/InvalidRequestException.java`, tests · modificar: `SecurityConfig.java`, `AuthController.java`, servicios y controllers con `try/catch` genéricos, `frontend/src/services/*.ts`, `docs/ARCHITECTURE.md`

## Tests
- Slice por cada probe de la auditoría §4 con el status esperado (tabla "Probes HTTP").
- Integración: login con password incorrecta → 401 `{"title":…,"detail":…}`.

## Criterios de aceptación
- [ ] Todos los probes de la auditoría §4 dan el "Esperado" (salvo los de autorización, que son de T-006).
- [ ] La UI: login incorrecto muestra un error y no navega; token vencido vuelve al login.
- [ ] `./scripts/verify.sh` en verde y la cobertura no baja.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Tests agregados: … · Pendientes → …
