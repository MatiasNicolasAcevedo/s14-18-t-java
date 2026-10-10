# T-017 · Actualizar la configuración de producción (front y back)
- Estado: Bloqueada (por T-002, T-007) · Prioridad: P0 · Esfuerzo: S · Ejecuta: 👤 dueño
- Fase: P0 Estabilizar
- Rama: — · Depende de: T-002, T-007 mergeadas · Spec/ADR: —
- Revisa: —

## Por qué
El deploy original (Render + Firebase) quedó con el front llamando a rutas viejas y el secreto JWT del código. Ver pregunta abierta 1 de la auditoría: si no se mantiene el deploy, cerrá esta tarea como "no aplica".

## Pasos (👤)
1. **Render (back):** Environment → agregar `JWT_SECRET` (nuevo: `openssl rand -base64 48`), `CORS_ALLOWED_ORIGINS=https://aware-gaming.web.app` y revisar `DB_*`, `MAIL_*`. Redeploy.
2. **Firebase (front):** en `frontend/`, crear `.env.production.local` (ignorado) con `VITE_API_URL=https://aware-gaming.onrender.com/v1`, `npm ci && npm run build && npx firebase deploy`.
3. Probar el login en <https://aware-gaming.web.app>.

## Criterios de aceptación
- [ ] Login en producción funciona; un token firmado con el secreto viejo es rechazado.

## Resultado
- Fecha: … · Notas: …
