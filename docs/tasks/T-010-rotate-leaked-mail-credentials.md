# T-010 · Rotar las credenciales de mail filtradas en el historial
- Estado: Lista · Prioridad: P0 🔴 · Esfuerzo: S · Ejecuta: 👤 dueño
- Fase: P0 Estabilizar
- Rama: — (no hay código) · Depende de: — · Spec/ADR: —
- Revisa: —

## Por qué
`backend/AwareGaming/src/main/resources/env.properties` se commiteó en `a41ae8d` (líneas 1-2: `MAIL_USERNAME` y `MAIL_PASSWORD`) y se borró en `67a9afa`, pero **sigue en el historial** y en la rama `origin/feat/add-swagger`. Borrar el archivo no alcanza: hay que invalidar la credencial. No se copia el valor en ningún documento.

## Pasos (👤)
1. Entrá a la cuenta de Google del `MAIL_USERNAME` de ese commit → **Seguridad → Contraseñas de aplicaciones** → revocá la contraseña usada por Aware Gaming.
2. Si se usó la contraseña de la cuenta (no de aplicación): cambiala y activá 2FA.
3. Revisá **Actividad reciente** de la cuenta por envíos o accesos raros.
4. Si el back sigue desplegado en Render: generá una contraseña de aplicación nueva y cargala solo como variable de entorno `MAIL_PASSWORD` en Render.
5. Borrá la rama ya mergeada: `git push origin --delete feat/add-swagger` (o desde GitHub → Branches).
6. Opcional (reescribe historia, coordinar antes): purgar el archivo con `git filter-repo --path backend/AwareGaming/src/main/resources/env.properties --invert-paths`. No es necesario si la credencial ya está revocada.
7. Anotá en "Resultado" la fecha (sin valores) y movela a "Hecho reciente" en `docs/BACKLOG.md` (o pedíselo al próximo agente).

## Criterios de aceptación
- [ ] La contraseña del commit `a41ae8d` ya no funciona.
- [ ] `git ls-remote --heads origin feat/add-swagger` no devuelve nada.

## Resultado
- Fecha: … · Notas: …
