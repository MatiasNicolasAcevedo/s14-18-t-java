# T-005 · Infraestructura de tests del back (JaCoCo, Testcontainers, referencias)
- Estado: Lista · Prioridad: P0 · Esfuerzo: M · Ejecuta: 🧠 modelo de frontera
- Fase: P0 Estabilizar
- Rama: `test/T-005-server-test-infra` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-004 · Spec/ADR: crea `docs/adr/0001-testcontainers-over-h2.md`
- Revisa: 🧠 modelo de frontera (sesión nueva) + 👤 dueño
- Título del PR: `test(server): add test infrastructure with testcontainers and jacoco`

## Por qué
Un solo test (`AwareGamingApplicationTests`) que necesita PostgreSQL en `localhost` y corre el seed; ningún flujo crítico cubierto (auditoría §6 "Testing" y §7). Sin referencias, el 🤖 no puede escribir tests.

## Objetivo
`./mvnw verify` corre sin configuración manual (Testcontainers), con JaCoCo y umbral, y deja un test de referencia por tipo.

## Alcance
- Incluye: dependencias de test (Testcontainers `postgresql` + `junit-jupiter`, vía BOM), `@ServiceConnection` o `@DynamicPropertySource`, perfil/propiedades de test (mail y `FRONTEND_URL` ficticios), JaCoCo 0.8.15 con `check` (umbral = base medida, redondeada hacia abajo), `lombok.config` con `lombok.addLombokGeneratedAnnotation = true`, 3 tests de referencia, ADR 0001, `docs/TESTING.md` (referencias y umbral), `scripts/verify.sh` sin levantar la DB si ya no hace falta.
- **No incluye:** cambiar lógica de la app, refactors de testabilidad de `GameService` (Backlog), tests de caracterización masivos (T-012).

## Leer antes
- `docs/TESTING.md` · `AwareGamingApplicationTests.java` · `application.properties` · `auth/AuthService.java:35-89` · `service/CommentService.java:110-165`

## Archivos previstos
- modificar: `pom.xml`, `AwareGamingApplicationTests.java`, `scripts/verify.sh`, `docs/TESTING.md`, `AGENTS.md` §8 · crear: `lombok.config`, `src/test/resources/application-test.properties` (o equivalente), `AuthServiceTest.java` (unitario, Mockito), `AuthControllerTest.java` (`@WebMvcTest`), `AuthIT.java` (integración: registro + login real), `docs/adr/0001-testcontainers-over-h2.md`

## Tests
- Unitario: `AuthService.register` con menor de 18 → `RegistrationException`.
- Slice: `POST /v1/api/auth/login` con servicio mockeado → 200 y `data.token`.
- Integración: registrar y loguear contra PostgreSQL en contenedor.

## Criterios de aceptación
- [ ] Con la DB del compose **apagada**: `cd backend/AwareGaming && ./mvnw -B clean verify` en verde.
- [ ] `target/site/jacoco/index.html` generado y `jacoco:check` falla si se baja el umbral (probado y revertido).
- [ ] `docs/TESTING.md` lista los 3 archivos de referencia, el umbral y el comando para un test.
- [ ] CI en verde.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Tests agregados: … · Umbral: …% · Pendientes → T-012
