# Protocolo · Auditor (auditoría periódica)
**Lo puede usar:** solo 🧠 modelo de frontera. Si sos el 🤖, no sigas: terminá con el traspaso de la sección 6 para 🧠.

**Cuándo:** cada 5–10 PR mergeados, antes de un cambio grande (migración de versión, deploy) o con 2+ tareas `requiere 🧠` en Bloqueadas.
Trabajá **por bloques**; al terminar cada bloque, commit y push. Entre bloques podés sugerir `/compact Conservar: auditoría AAAA-MM-DD, bloque N terminado, hallazgos ya volcados en el archivo y próximo bloque. Descartar: salidas y archivos ya procesados.`

## 0. Rama
`git switch main && git pull && git switch -c docs/audit-AAAA-MM-DD`. Creá `docs/audits/AAAA-MM-DD-periodic.md` (resumen ejecutivo con semáforo por dimensión) y PR draft `docs: periodic audit AAAA-MM-DD`.

## 1. Situación
- Leé `docs/STATUS.md`, `docs/BACKLOG.md`, `docs/ROADMAP.md` y la **última** auditoría.
- Cambios desde el tag anterior: `git log --oneline audit/<fecha-anterior>..main` y PR mergeados con sus revisiones (`gh pr list --state merged --limit 20`).

## 2. Trabajo de los agentes
- Calidad de lo mergeado; ¿los criterios se cumplieron de verdad?
- Revisiones que dejaron pasar problemas (y por qué: ¿falta algo en `reviewer.md`?).
- Spot check de tests: rompé una línea de lógica en 2–3 servicios y verificá que algo falle (revertí). PIT/Stryker puntual si hace falta.

## 3. Salud
- Cobertura vs. umbral: si creció, **subí el umbral** (trinquete) en el mismo PR.
- Tests lentos o inestables (tiempos en `.verify-logs/`).
- **Onboarding desde un clon limpio en los dos modos** (contenedores y desarrollo) siguiendo el README al pie de la letra; corregí lo que falle y actualizá la línea "Verificado el …".
- `.example` completos y coherentes con compose, SETUP y scripts; deriva documental (versiones, comandos, puertos).
- `npm audit --omit=dev` y dependencias Maven desactualizadas.

## 4. Resolver y replanificar
- Decisiones del dueño ya tomadas → ADR en `docs/adr/`.
- Tareas 🧠 prioritarias: **de a una**, cada una en su rama y PR (no en el de la auditoría).
- Relevamiento liviano de lo que cambió; reordená la cola y refiná 5–10 tareas en "Listas" en orden de ejecución, con al menos 3 para 🤖 (Definición de Listo: S/M, < ~400 líneas y < ~8 archivos, sin decisiones de diseño, test de referencia, contexto < 40 % del 🤖).
- Ajustá `AGENTS.md`, plantillas o protocolos si algo falla repetidamente.

## 5. Cerrar
- Auditoría completa, `STATUS.md` (salud, "Última auditoría", próximo paso), archivo (tareas viejas → `docs/archive/tasks/`, sesiones → `docs/archive/log/AAAA-MM.md`).
- PR `docs: periodic audit AAAA-MM-DD` listo para revisión. Después del merge: `git tag audit/AAAA-MM-DD origin/main && git push origin audit/AAAA-MM-DD`.
- Sugerí sesión nueva.

## 6. Respuesta final (máx. 5 líneas) + traspaso
> **Próximo paso:** T-NNN · <título> · **ejecuta: 🤖 agente gratuito (IntelliJ)** | **🧠 modelo de frontera** | **👤 dueño**
> **Qué hacer:** abrí <un chat nuevo del agente de IntelliJ | una sesión nueva de Claude Code | GitHub → …> y escribí: «Leé `AGENTS.md` y seguí `docs/agents/implementer.md`»
