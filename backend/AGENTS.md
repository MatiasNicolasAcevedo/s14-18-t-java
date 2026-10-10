# AGENTS.md · backend

Solo lo específico del back. Lo general está en el [AGENTS.md raíz](../AGENTS.md).

- Todo comando se corre desde `backend/AwareGaming/`. Gate de esta parte: `../../scripts/verify.sh --server`.
- Un test: `./mvnw test -Dtest=Clase#metodo`. Necesita la DB: `docker compose up -d --wait` desde la raíz.
- Rutas bajo `v1/api/<recurso>` (`@RequestMapping("v1/api/...")`). Públicas solo las de `SecurityConfig.publicEndpoints()` (`config/SecurityConfig.java:54-62`).
- El usuario autenticado se obtiene con `Authentication authentication` → `authentication.getName()` (email). Ver `controller/GameController.java:43-45`.
- Hoy no hay `@Valid` ni `@RestControllerAdvice` (llegan en T-008/T-009): no inventes otro mecanismo; seguí la tarea.
- Seed: `utils/DataLoader.java` (412 líneas: leé por rangos). No cambies los usuarios demo sin tarea (los usan README y tests).
- Lombok: `@Data`/`@Builder` en entidades y DTOs. No agregues dependencias nuevas sin tarea.
- No toques `Dockerfile` (prod/Render), `application.properties` de prod ni `JwtService` sin tarea 🧠.
- Archivos caros: `DataLoader.java`, `GameService.java` (257 líneas). Leé por rangos.
