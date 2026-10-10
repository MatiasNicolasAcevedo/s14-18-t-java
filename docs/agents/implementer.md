# Protocolo · Implementador (una tarea por sesión)
**Lo pueden usar:** 🤖 agente gratuito de IntelliJ y 🧠 modelo de frontera. Este archivo es tu prompt completo: seguilo en orden.

## 1. Orientarte (sin escribir código)
- Leé `AGENTS.md`, `docs/STATUS.md` y `docs/BACKLOG.md`.
- `git status` y `git log --oneline -10`.
- PRs abiertos: `gh pr list` (🧠) · sin `gh` ni MCP (🤖): `git fetch --prune && git ls-remote --heads origin` (cada rama `<tipo>/T-NNN-*` es una tarea tomada).

## 2. Primero lo que está en vuelo
- Si un PR tiene **cambios pedidos** en una revisión y la tarea te corresponde: atendelo en su rama (`git switch <rama> && git pull`), sin tomar otra tarea.
- Si hay **un PR de tarea abierto** esperando revisión o merge: no tomes otra. Terminá con el traspaso (sección 11) diciendo quién revisa o mergea.

## 3. Línea de base
- `git switch main && git pull` y `./scripts/verify.sh`.
- Si falla por algo que no es de tu tarea: si ya hay una tarea que lo arregla, tomá esa (si te corresponde); si no, creala en `docs/BACKLOG.md` y avisá con el traspaso.

## 4. Tomar la tarea
- Tomá **la primera** de "✅ Listas" que no tenga PR ni rama remota.
- Si es 🧠 y sos el 🤖, o es 👤 y no dice "(no bloquea la cola)": **no la tomes ni saltees a otra**. Traspaso y terminá.
- **Antes de cualquier commit**, creá la rama con el nombre exacto de la tarea: `git switch -c <tipo>/T-NNN-slug`.
- Mové la tarea a "🔨 En curso" en `docs/BACKLOG.md` y poné "Estado: En curso" en el archivo de la tarea. Commit `docs(board): start T-NNN` (con `Refs: T-NNN`) y `git push -u origin <rama>`.
- PR en **draft** con el template (`.github/pull_request_template.md`) y el título de la tarea:
  - Con `gh`: `gh pr create --draft --title "<título>" --body-file <archivo>`.
  - Sin `gh` ni MCP (🤖): dejale al dueño, en tu respuesta, el link `https://github.com/MatiasNicolasAcevedo/s14-18-t-java/compare/main...<rama>?expand=1`, el título y el cuerpo listos para pegar, y pedile que lo abra como **draft**.

## 5. Contexto mínimo
Leé la tarea y **solo** lo de "Leer antes" y "Archivos previstos", por rangos de líneas. No abras lockfiles, `target/`, `node_modules/`, `dist/` ni `docs/archive/`.

## 6. Implementar con tests
- Respetá "No incluye". Bugfix: primero el test que falla, después el fix.
- Entre pasos, el test más específico (`./mvnw test -Dtest=Clase#metodo`); al final, `./scripts/verify.sh`.
- Si agregás o cambiás una variable: `.example`, `docker-compose.yml`, `docs/SETUP.md` y README en el mismo PR.
- Commits atómicos en inglés, Conventional Commits, con `Refs: T-NNN`. Push frecuente.

## 7. Si el contexto se hace largo
Completá "Notas de implementación" (hecho / pendiente / próximo paso), commit y push. Después:
- 🧠: sugerí `/compact Conservar: tarea T-NNN, rama y PR, decisiones, archivos modificados, estado de verify y próximo paso. Descartar: logs y contenido de archivos ya procesados.` y «después escribime "seguí con T-NNN"».
- 🤖 (sin `/compact`): «abrí un chat nuevo y escribí: Leé `AGENTS.md` y seguí `docs/agents/implementer.md` (retomando T-NNN)».

## 8. Reglas duras
No editar los criterios de aceptación · no borrar, deshabilitar ni debilitar tests · no bajar umbrales · no cambiar versiones mayores, arquitectura, seguridad, CI ni configuración de prod sin tarea · no tocar ni leer secretos (`env.properties`, `.env.local`) · no commitear a `main` · no mergear. Trabajo extra que descubras → una línea en "📥 Backlog", no "de paso".

## 9. Escalar
Si fallaste 2 veces con el mismo problema, hace falta una decisión de diseño o algo está fuera de alcance:
1. Commiteá lo que esté sano y completá "Notas" con lo que probaste.
2. Mové la tarea a "⛔ Bloqueadas" con `bloqueada por: requiere 🧠` o `requiere dueño`. **La cola queda detenida en esta tarea** (no tomes la siguiente).
3. Comentario en el PR draft (o en tu respuesta, si no tenés `gh`) con el motivo.
4. Traspaso, p. ej.: «ejecuta: 🧠 · abrí una sesión nueva de Claude Code y escribí: Seguí `docs/agents/implementer.md` para retomar T-NNN».

## 10. Cerrar
- Comprobá cada criterio de aceptación y marcá `[x]` solo lo verificado.
- Completá "Notas" y "Resultado" (con el número de PR).
- En `docs/BACKLOG.md`: tarea a "🏁 Hecho reciente" con el PR (si hay más de 10, mové las viejas a `docs/archive/tasks/`). Actualizá la cola si la tarea desbloqueó otras (de "Bloqueadas" a "Listas", en orden).
- `docs/STATUS.md`: salud, cobertura, foco, próximo paso y una línea en "Últimas sesiones" (máx. 5; las viejas a `docs/archive/log/AAAA-MM.md`).
- Descripción del PR completa (resumen de `verify.sh`; capturas a 375 y 1280 px si hay UI) y marcalo **ready** (`gh pr ready`; sin `gh`, pedíselo al dueño), indicando quién revisa según la tarea.

## 11. Respuesta final (máx. 5 líneas) + traspaso
Qué hiciste, estado de `verify.sh`, link del PR (o de comparación) y el traspaso según "Revisa" de la tarea:

> **Próximo paso:** revisar PR #N (T-NNN) · **ejecuta: 🤖 agente gratuito (IntelliJ)** | **🧠 modelo de frontera**
> **Qué hacer:** abrí <un chat nuevo del agente de IntelliJ | una sesión nueva de Claude Code> y escribí: «Seguí `docs/agents/reviewer.md` para el PR #N»

Sugerí siempre sesión nueva para lo que sigue.
