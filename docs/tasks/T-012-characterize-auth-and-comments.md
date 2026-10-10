# T-012 · Tests de caracterización: registro y comentarios por dueño
- Estado: Bloqueada (por T-005) · Prioridad: P0 · Esfuerzo: S · Ejecuta: 🤖 agente gratuito
- Fase: P0 Estabilizar
- Rama: `test/T-012-characterize-auth-comments` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-005 · Spec/ADR: —
- Revisa: 🤖 agente gratuito (chat nuevo)
- Título del PR: `test(server): characterize registration and comment ownership`

## Por qué
Flujos críticos sin tests (auditoría §7): registro (+18, email/DNI únicos) y "solo el dueño edita o borra su comentario". Se fija el comportamiento actual antes de migrar versiones.

## Objetivo
Tests unitarios que documentan el comportamiento **actual** (aunque sea mejorable) y fallan si cambia.

## Alcance
- Incluye: `AuthServiceTest` (ampliar el de T-005) y `CommentServiceTest` nuevo, con Mockito.
- **No incluye:** cambiar código de producción. Si un test revela un bug, **no lo arregles**: anotalo en "Notas" y agregá una línea al Backlog.

## Leer antes
- `auth/AuthService.java:56-89` · `service/CommentService.java:73-165` · archivo de referencia de test unitario (ver `docs/TESTING.md`)

## Archivos previstos
- modificar: `src/test/java/com/awaregaming/AwareGaming/auth/AuthServiceTest.java` · crear: `src/test/java/com/awaregaming/AwareGaming/service/CommentServiceTest.java`

## Tests
- `AuthService.register`: edad 18 → guarda y devuelve token; edad 17 → `RegistrationException` sin `save`; `DataIntegrityViolationException` con el email en el mensaje → "Ya existe un usuario con ese email…"; con el DNI → "…ese dni…".
- `CommentService`: `addComment` vacío → 400; post inexistente → 404; `updateComment` de otro usuario → 401 (comportamiento actual) y sin `save`; dueño → 200 y `updatedAt` seteado; `deleteComment` del dueño → `isDeleted=true`.

## Criterios de aceptación
- [ ] `./mvnw test -Dtest='AuthServiceTest,CommentServiceTest'` en verde (desde `backend/AwareGaming`).
- [ ] Spot check: cambiar `>= 18` por `> 18` en `AuthService` hace fallar un test (revertido; anotado en "Notas").
- [ ] `./scripts/verify.sh` en verde y la cobertura sube.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Tests agregados: … · Bugs encontrados → Backlog: …
