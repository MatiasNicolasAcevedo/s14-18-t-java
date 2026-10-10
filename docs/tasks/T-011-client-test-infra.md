# T-011 · Infraestructura de tests del front (Vitest + RTL + MSW)
- Estado: Bloqueada (por T-003) · Prioridad: P0 · Esfuerzo: M · Ejecuta: 🧠 modelo de frontera
- Fase: P0 Estabilizar
- Rama: `test/T-011-client-test-infra` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-003 (lockfile), T-004 (CI) · Spec/ADR: —
- Revisa: 🧠 modelo de frontera (sesión nueva) + 👤 dueño
- Título del PR: `test(client): add vitest, testing library and msw`

## Por qué
El front no tiene tests (auditoría §6 "Testing"). Sin infraestructura ni referencias, el 🤖 no puede cubrir el login, las rutas protegidas ni la ruleta.

## Objetivo
`npm test` corre Vitest con jsdom, RTL y MSW, con cobertura v8 y umbral, y deja tests de referencia.

## Alcance
- Incluye: `vitest` (versión compatible con Vite 5; si exige Vite ≥ 6, usar la última que lo soporte y anotar), `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`, `msw`; `vitest.config.ts` o bloque `test` en `vite.config.ts`; `src/test/setup.ts`; handlers MSW para `POST /v1/api/auth/login` y `GET /v1/api/user`; scripts `test` y `test:coverage`; umbral = base medida; `docs/TESTING.md` (referencias, comando para un test, umbral); `verify.sh` ya corre `npm test -- --run` si existe el script.
- **No incluye:** migrar Vite/React (P1), tests masivos (tareas 🤖 después).

## Tests (referencias)
- Servicio: `services/auth.services.test.ts` → `login` llama a `${apiUrl}/api/auth/login` (cubre T-002) y devuelve `message` si no es ok.
- Componente: `components/LoginForm/LoginForm.test.tsx` → envía el formulario y muestra error de credenciales (MSW 401).
- Rutas: `routes/AppRoutes.test.tsx` → sin token, `/dashboard/profile` redirige a `/login`.

## Criterios de aceptación
- [ ] `cd frontend && npm test -- --run` en verde; `npm run test:coverage` genera reporte y falla bajo el umbral.
- [ ] `./scripts/verify.sh --client` muestra `✅ tests (N)` y CI en verde.
- [ ] `docs/TESTING.md` actualizado.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Umbral: …% · Pendientes → …
