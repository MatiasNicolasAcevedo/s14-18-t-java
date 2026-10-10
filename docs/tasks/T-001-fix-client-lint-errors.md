# T-001 · Dejar el lint del front en verde
- Estado: Lista · Prioridad: P0 · Esfuerzo: S · Ejecuta: 🤖 agente gratuito
- Fase: P0 Estabilizar
- Rama: `fix/T-001-client-lint-errors` (crearla desde `main` actualizado antes del primer commit) · Depende de: — · Spec/ADR: —
- Revisa: 🤖 agente gratuito (chat nuevo)
- Título del PR: `fix(client): resolve eslint errors`

## Por qué
`npm run lint` sale con error (5 errores + 1 warning con `--max-warnings 0`), así que `./scripts/verify.sh` nunca puede quedar en verde (auditoría §6, "CI/CD, flujo git y calidad").

## Objetivo
`npm run lint` termina con código 0 sin cambiar el comportamiento de la app.

## Alcance
- Incluye: borrar las directivas `eslint-disable` sin uso y resolver el warning de `DashboardPage.tsx`.
- **No incluye:** cambiar reglas de `.eslintrc.cjs`, actualizar ESLint, reformatear otros archivos, tocar lógica.

## Leer antes
- `frontend/AGENTS.md`
- `frontend/src/pages/DashboardPage.tsx:1-15`
- Salida de `npm run lint` (desde `frontend/`)

## Archivos previstos
- modificar: `frontend/src/components/CardJuego/CardJuego.tsx` (línea 1), `frontend/src/pages/ViewsLanding/ViewLanding4.tsx` (líneas 1-2), `frontend/src/store/token/slice.ts` (líneas 1-2), `frontend/src/pages/DashboardPage.tsx` (línea 12-14)

## Tests
- No hay infraestructura de tests de front (llega en T-011). La verificación es por comando (criterios).

## Pasos sugeridos
1. Borrar las líneas `/* eslint-disable … */` que el lint marca como "Unused eslint-disable directive" (son 5, en los 3 archivos).
2. En `DashboardPage.tsx`, el `useEffect(() => { getProfile(); }, [])` debe correr **una sola vez al montar** (`getProfile` cambia en cada render: agregarlo a las dependencias provocaría un bucle de requests). Agregá justo arriba del array de dependencias: `// eslint-disable-next-line react-hooks/exhaustive-deps -- carga el perfil solo al montar`.
3. `npm run lint` y `npm run build`.

## Criterios de aceptación
- [ ] Desde `frontend/`: `npm run lint` termina con código 0 (`echo $?` → `0`).
- [ ] Desde `frontend/`: `npm run build` termina con `✓ built in`.
- [ ] `./scripts/verify.sh --client` muestra `client: ✅ lint ✅ build`.
- [ ] `git diff --stat` toca solo los 4 archivos previstos.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Tests agregados: — · Pendientes → nuevas tareas: …
