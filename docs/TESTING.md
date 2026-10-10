# Estrategia de testing

Estado de base (2026-10-10): back **1 test** (`contextLoads`), cobertura **34,5 % líneas / 0,1 % ramas** (inflada por el seed y Lombok); front **sin tests**; E2E **no existe**. Plan en "Roadmap de testing".

## 1. Pirámide y herramientas

| Capa | Herramientas | Qué cubre |
|---|---|---|
| Back · unitario | JUnit 5 (Jupiter, del parent de Boot), AssertJ, Mockito con mesura | reglas de servicios: pagos de ruleta, edad mínima, dueño de comentarios, créditos |
| Back · slice web | `@WebMvcTest` + `spring-security-test` (`@WithMockUser`, `jwt`) | validación, códigos HTTP, formato de error, permisos por rol |
| Back · JPA | `@DataJpaTest` + Testcontainers | solo queries propias (`findByIsDeletedFalse`, `findByUser`) |
| Back · integración | `@SpringBootTest` + **Testcontainers PostgreSQL 16** | login/registro de punta a punta, seed, seguridad real |
| Cobertura back | **JaCoCo** con umbral en `verify` | trinquete (sección 5) |
| Front · componentes | **Vitest** + **React Testing Library** (consultas por rol/label) | estados de UI, formularios, rutas protegidas |
| Front · API | **MSW** (contrato desde el OpenAPI de springdoc) | services y hooks sin back real |
| E2E | **Playwright**, desktop 1280 + mobile 375 | smoke: login → perfil → ruleta |

Sin H2: la DB real es PostgreSQL y el SQL generado difiere (se documenta en un ADR dentro de T-005).

## 2. Qué testear y qué no
- **Sí:** reglas de negocio (pagos, créditos, +18), validaciones, permisos (rol y dueño), contratos de API (status y cuerpo), estados de UI (loading/error/empty).
- **No:** getters/setters, código generado por Lombok, el framework (que Spring inyecte un bean), estilos.

## 3. Convenciones
- **Ubicación:** back en `backend/AwareGaming/src/test/java/<mismo paquete>/XxxTest.java` (unitario/slice) y `XxxIT.java` (integración). Front junto al archivo: `LoginForm.test.tsx`.
- **Nombres:** `metodo_condicion_resultadoEsperado` (ej.: `register_underage_throwsRegistrationException`). En Vitest: `it('muestra error si …')`.
- **Arrange / Act / Assert** separados por una línea en blanco.
- **Datos:** builders o factories de prueba (`TestUsers.adult()`), nunca los usuarios del seed en tests unitarios.
- **Archivos de referencia** ("copiá el estilo de…"): los crea T-005 (back) y T-011 (front) y se listan acá:
  - Unitario back: _pendiente T-005_ · Slice web: _pendiente T-005_ · Integración: _pendiente T-005_ (hoy: `AwareGamingApplicationTests.java`)
  - Componente front: _pendiente T-011_ · E2E: _pendiente T-013_
- **Correr un solo test:**
  - Back (desde `backend/AwareGaming`): `./mvnw test -Dtest=AwareGamingApplicationTests#contextLoads` (con la DB levantada hasta T-005)
  - Front: `npx vitest run src/components/LoginForm/LoginForm.test.tsx` (desde T-011)

## 4. Reglas para todas las tareas
- Tests **en el mismo PR** que el cambio.
- **Bugfix = primero un test que falla** y después el fix.
- **Caracterización** antes de refactorizar o migrar versiones.
- Prohibido borrar, deshabilitar (`@Disabled`, `.skip`) o debilitar tests o asserts.
- Tests deterministas: sin depender del orden, de la hora (`Clock`), del azar (`Random` inyectado) ni de red o datos compartidos.

## 5. Cobertura como trinquete
- Se mide la base y el umbral se fija en ese valor **redondeado hacia abajo**; **nunca se baja**. Cada auditoría lo sube.
- Back: JaCoCo `check` en `verify` (T-005). Excluir Lombok con `lombok.config` → `lombok.addLombokGeneratedAnnotation = true`.
- Front: cobertura v8 de Vitest (T-011).
- Meta orientativa: ≥ 70–80 % en servicios/dominio y lógica de front.

| Parte | Base | Umbral | Fecha |
|---|---|---|---|
| Back (líneas) | 34,5 % (sin excluir Lombok) | se fija en T-005 | 2026-10-10 |
| Front | 0 % | se fija en T-011 | 2026-10-10 |

## 6. Opcional
Mutation testing puntual en auditorías: PIT (`pitest-maven`) sobre `GameService`; Stryker en el front.

## Roadmap de testing (antes de cualquier migración)
1. 🧠 [T-005](tasks/T-005-server-test-infra.md) infra back: JaCoCo con umbral, Testcontainers, tests sin configuración manual, primer test de integración y referencias.
2. 🧠 [T-011](tasks/T-011-client-test-infra.md) infra front: Vitest + RTL + MSW (Vite ya está; no hay CRA).
3. 🧠 [T-013](tasks/T-013-e2e-smoke-infra.md) infra E2E: Playwright + `scripts/e2e.sh` + job de CI.
4. 🤖 caracterización: [T-012](tasks/T-012-characterize-auth-and-comments.md) y una tarea por flujo crítico sin tests (ver la auditoría, sección 7).
