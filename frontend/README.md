# Frontend · Aware Gaming (React + Vite)

SPA en React 18 + TypeScript + Vite 5. Para levantar todo el proyecto, ver el [README raíz](../README.md).

## Configurar y correr (desde `frontend`)

1. Copiar la configuración local:

```bash
cp .env.local.example .env.local
```

2. Instalar dependencias (Node 24 de `.nvmrc`; hoy no hay lockfile, ver [T-003](../docs/tasks/T-003-commit-client-lockfile.md)):

```bash
npm install
```

3. Correr en modo desarrollo (necesita el back en `localhost:8080`):

```bash
npm run dev
```

**Resultado esperado:** `Local: http://localhost:5173/`.

## Scripts

| Qué | Comando |
|---|---|
| Desarrollo | `npm run dev` |
| Build de producción (`tsc` + Vite) | `npm run build` |
| Lint | `npm run lint` (⚠️ hoy falla: [T-001](../docs/tasks/T-001-fix-client-lint-errors.md)) |
| Previsualizar el build | `npm run preview` |
| Tests | todavía no hay ([T-011](../docs/tasks/T-011-client-test-infra.md)) |
| Gate completo | `../scripts/verify.sh --client` |

## Estructura (`src/`)

| Carpeta | Contenido |
|---|---|
| `pages/` | páginas por ruta (`LandingPage`, `LoginPage`, `DashboardPage`, `RoulletePage`, …) |
| `components/` | componentes en carpetas (`NavBar/NavBar.tsx`, …) |
| `routes/AppRoutes.tsx` | rutas y protección por sesión |
| `services/` | llamadas `fetch` a la API (`*.services.ts`) |
| `hooks/` | `useAuth`, `useUser`, `useRoullete`, `useStore` |
| `store/` | Redux Toolkit (token, usuario, ruleta) |
| `config/index.ts` | `apiUrl` desde `VITE_API_URL` |

Producción: Firebase Hosting (`firebase.json`). Reglas para agentes: [AGENTS.md](AGENTS.md).
