# AGENTS.md · frontend

Solo lo específico del front. Lo general está en el [AGENTS.md raíz](../AGENTS.md).

- Todo comando se corre desde `frontend/`. Gate de esta parte: `../scripts/verify.sh --client` (lint + build; tests cuando exista T-011).
- Estilo: Prettier con tabs, comillas simples, `singleAttributePerLine` (`.prettierrc`). Alias `@/` → `src/`.
- Llamadas a la API solo en `src/services/*.services.ts` con `fetch` y `config.apiUrl`; los componentes usan hooks (`src/hooks/`). Seguí `services/user.services.ts` + `hooks/useUser.ts`.
- La base URL sale de `VITE_API_URL` (`src/config/index.ts`). Nunca hardcodees URLs del back.
- Estado global con Redux Toolkit (`src/store/*/slice.ts`); token en `localStorage` (`store/token/slice.ts`).
- Notificaciones con `react-toastify` (`toast.promise`, `toast.error`).
- Estilos con Tailwind + DaisyUI; imágenes remotas en Cloudinary. No agregues librerías de UI nuevas sin tarea.
- Archivos caros: `pages/RoulletePage.tsx` (669 líneas), `components/MenuIcon/MenuIcon.tsx` (SVG). Leé por rangos.
- Cambios de UI: capturas a 375 y 1280 px en el PR.
