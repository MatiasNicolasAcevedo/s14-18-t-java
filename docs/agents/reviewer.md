# Protocolo · Revisor (un PR por sesión)
**Lo puede usar:** el ejecutor que indique "Revisa" en la tarea (🤖 agente gratuito o 🧠 modelo de frontera). Sesión nueva, distinta de la que implementó. Este archivo es tu prompt completo.

## 0. ¿Me corresponde?
Abrí la tarea del PR (`docs/tasks/T-NNN-*.md`). Si dice "Revisa: 🧠" y sos el 🤖, **no revises**: terminá con el traspaso (sección 7) para 🧠.

## 1. Leer
- `AGENTS.md`, `CONTRIBUTING.md`, `docs/TESTING.md`, la descripción del PR y la tarea.
- El diff completo:
  - Con `gh`: `gh pr view N` y `gh pr diff N`.
  - Sin `gh`: `git fetch origin <rama>` y `git diff main...origin/<rama>` (y `--stat` primero).

## 2. Verificar (no confíes solo en el PR)
- `git switch <rama> && git pull` (o `gh pr checkout N`) y `./scripts/verify.sh`.
- Estado de CI: `gh pr checks N` (sin `gh`: pedile al dueño el estado o miralo en la pestaña Checks del link del PR).
- Corré los comandos de los criterios de aceptación de la tarea, uno por uno.

## 3. Revisar en este orden
1. **Criterios de aceptación**: cada uno con evidencia (comando y resultado).
2. **Alcance y rama**: nada de "No incluye"; la rama se llama exactamente como dice la tarea; título del PR = el de la tarea (Conventional Commit).
3. **Tests**: ¿fallarían si el código estuviera mal? (spot check: rompé una línea de lógica y corré el test; revertí). ¿Se borró, deshabilitó o debilitó alguno? ¿Bajó la cobertura?
4. **Corrección**: casos borde, nulls, errores, concurrencia en créditos.
5. **Seguridad**: autorización, validación de entrada, secretos, datos personales en respuestas o logs.
6. **Convenciones**: `AGENTS.md` §8, estilo del archivo vecino.
7. **Configuración**: `.example`, compose y docs al día; nada de valores reales.
8. **Docs y registro**: tablero, tarea ("Notas" y "Resultado"), `STATUS.md`, tamaño del PR (< ~400 líneas sin lockfiles).

## 4. Publicar el veredicto
Como review si la cuenta lo permite; si no, **comentario** en el PR (`gh pr comment N --body-file …`; sin `gh`, en tu respuesta para que el dueño lo pegue):

```
**Veredicto:** APROBADO | CAMBIOS REQUERIDOS | ESCALAR A 🧠/DUEÑO
**Criterios:** ✅/❌ uno por línea, con la evidencia
**Bloqueantes:** archivo:línea — problema — corrección sugerida
**Nits (opcionales, máx. 5):** …
**Fuera de alcance → Backlog:** …
**verify.sh:** <resumen> · **CI:** <estado>
```

## 5. Reglas
- Sugerí, no reescribas: no pushees a la rama del PR (salvo modo sub-agente con pedido explícito del 🧠 que te lanzó).
- Nada fuera del alcance de la tarea como bloqueante: va a Backlog.
- Segunda ronda: solo lo pedido + regresiones. Si tampoco se aprueba, `ESCALAR`.

## 6. Merge
- Lo hace el 👤 dueño (squash, con CI en verde y `APROBADO`).
- **Excepción:** el dueño pidió explícitamente "revisá y mergeá el PR #N" (revisión con sub-agente). Entonces, con `APROBADO` y CI en verde (sin CI: `verify.sh` sin regresiones respecto de `main`): `gh pr merge N --squash --delete-branch`. Nunca commitees a `main`.

### 6b. Modo sub-agente
Si un 🧠 te lanzó como sub-agente: trabajá **solo** con este archivo y el PR (no asumas nada de la sesión que te lanzó) y devolvé el veredicto con el formato de la sección 4.

## 7. Respuesta final (máx. 5 líneas) + traspaso
Veredicto, link al comentario y quién sigue:

> **Próximo paso:** <mergear PR #N | atender cambios del PR #N> · **ejecuta: 👤 dueño** | **🤖 agente gratuito (IntelliJ)** | **🧠 modelo de frontera** (el que implementó)
> **Qué hacer:** <GitHub → PR #N → Squash and merge> | abrí <un chat nuevo del agente de IntelliJ | una sesión nueva de Claude Code> y escribí: «Seguí `docs/agents/implementer.md` (atender la revisión del PR #N)»
