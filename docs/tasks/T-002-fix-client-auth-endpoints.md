# T-002 · Arreglar las rutas de auth del front para que el login funcione
- Estado: Lista · Prioridad: P0 · Esfuerzo: S · Ejecuta: 🤖 agente gratuito
- Fase: P0 Estabilizar
- Rama: `fix/T-002-client-auth-endpoints` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-001 · Spec/ADR: —
- Revisa: 🤖 agente gratuito (chat nuevo)
- Título del PR: `fix(client): call auth endpoints under /api`

## Por qué
El commit `a41ae8d` movió la API a `/v1/api/*`. El front arma `${apiUrl}/auth/login` y `${apiUrl}/auth/register` (`frontend/src/services/auth.services.ts:7,21`) pero `${apiUrl}/api/...` para el resto. Con `VITE_API_URL=http://localhost:8080/v1` el login va a `/v1/auth/login` → **403** (auditoría §4, probe "old path"). Validado en la auditoría (pruebas en seco): con solo estas 2 URLs cambiadas, el login lleva a `/dashboard/profile` y carga el perfil.

## Objetivo
Con `VITE_API_URL=http://localhost:8080/v1`, el login con el usuario seed lleva a `/dashboard/profile` y muestra el perfil.

## Alcance
- Incluye: cambiar `/auth/login` → `/api/auth/login` y `/auth/register` → `/api/auth/register` en `auth.services.ts`; quitar la línea "⚠️ Hoy el login…" de `frontend/.env.local.example`; quitar los ⚠️ de T-002 del README raíz (opción A paso 3, opción B paso 6) y de "Problemas frecuentes".
- **No incluye:** cambiar `VITE_API_URL`, `config/index.ts`, el back, el manejo de login fallido (el back responde 200 con token `null`: T-009), el deploy de producción (T-017).

## Leer antes
- `frontend/src/services/auth.services.ts` (completo, 44 líneas)
- `frontend/src/config/index.ts`
- `README.md` → secciones "Opción A" y "Opción B"

## Archivos previstos
- modificar: `frontend/src/services/auth.services.ts`, `frontend/.env.local.example`, `README.md`

## Tests
- No hay infraestructura de tests de front (T-011, que debe incluir un test de estas rutas con MSW). Verificación por comando y manual (criterios).

## Pasos sugeridos
1. Editar las 2 URLs. 2. `npm run lint` y `npm run build`. 3. `./scripts/dev.sh` y probar el login en <http://localhost:5173/login>. 4. Actualizar `.env.local.example` y README.

## Criterios de aceptación
- [ ] `grep -n "apiUrl}/auth" frontend/src/services/*.ts` no devuelve nada.
- [ ] `./scripts/verify.sh --client` en verde.
- [ ] Con `./scripts/dev.sh` corriendo: login con `monicavelarde@gmail.com` / `user1` → URL `/dashboard/profile` y el nombre "Mónica" visible. En las DevTools, `POST http://localhost:8080/v1/api/auth/login` → 200.
- [ ] Registro de un usuario nuevo mayor de 18 desde `/register` → entra al dashboard.
- [ ] README sin ⚠️ de T-002.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Tests agregados: — (llegan con T-011) · Pendientes → T-017 (prod)
