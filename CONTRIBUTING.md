# Cómo contribuir

Flujo para humanos y agentes. Ejecutores: 🧠 modelo de frontera · 🤖 agente gratuito de IntelliJ · 👤 dueño (ver [AGENTS.md](AGENTS.md)).

## 1. Ramas (GitHub Flow)
- `main` siempre en verde; **nadie commitea directo a `main`**.
- **Antes del primer commit de una tarea**, creá su rama desde `main` actualizado, con el nombre exacto de la tarea:
  ```bash
  git switch main && git pull && git switch -c <tipo>/T-NNN-slug-corto
  ```
- Tipos: `feat`, `fix`, `test`, `refactor`, `chore`, `docs`, `ci`, `build`, `perf`.
- Vida corta. Si `main` avanzó: `git fetch origin && git rebase origin/main` (en tu propia rama) y `git push --force-with-lease` solo en esa rama.

## 2. Commits (Conventional Commits, en inglés)
```
tipo(alcance): descripción en imperativo

Cuerpo opcional: el porqué.

Refs: T-NNN
```
- Alcances usuales: `server`, `client`, `infra`, `docs`, `board`.
- Atómicos: un cambio lógico por commit. `!` y `BREAKING CHANGE:` para cambios incompatibles.
- Prohibido: "wip", "fix", "cambios", "Update X.md".

## 3. Pull requests
- **Uno por tarea**, chico (< ~400 líneas sin lockfiles ni generados) y **uno abierto a la vez**: no se empieza otra tarea hasta que el PR anterior se mergea o se cierra.
- **Título = Conventional Commit** (lo valida `.github/workflows/pr-title.yml`; se mergea con squash).
- Se abre en **draft apenas se crea la rama** y pasa a "ready" con `./scripts/verify.sh` en verde y el template completo.
- Sin `gh` ni MCP (caso típico del 🤖): `git push -u origin <rama>` y dejale al dueño el link `https://github.com/MatiasNicolasAcevedo/s14-18-t-java/compare/main...<rama>?expand=1` con título y cuerpo listos para pegar.

## 4. Revisión
Siempre en una sesión distinta de la que implementó, con [docs/agents/reviewer.md](docs/agents/reviewer.md).

| PR | Implementa | Revisa | Quién lanza la revisión |
|---|---|---|---|
| Tarea 🤖 S, sin riesgo | 🤖 agente gratuito | 🤖 agente gratuito, **chat nuevo** | 👤 abre el chat nuevo |
| Tarea 🤖 M, o que toca back y front, seguridad, datos, configuración o CI | 🤖 agente gratuito | 🧠 modelo de frontera | 👤 abre una sesión de frontera |
| Tarea 🧠 | 🧠 modelo de frontera | 🧠 sesión nueva o sub-agente (si el dueño lo pide) + 👤 | 👤 |
| Dependabot | bot | 🤖; versión mayor → tarea 🧠 | 👤 |

- La tarea indica en "Revisa" quién revisa; la respuesta final de quien implementó dice qué abrir y qué escribir.
- Sin cuenta bot, la revisión es un **comentario** con veredicto: `APROBADO` / `CAMBIOS REQUERIDOS` / `ESCALAR A 🧠/DUEÑO`.
- Máximo 2 rondas; después se escala a 🧠 o al dueño.

## 5. Merge
Squash, con CI en verde y revisión aprobada. Lo hace el 👤 dueño, o el 🧠 si el dueño se lo pidió explícitamente para ese PR ("revisá y mergeá el PR #N"). Después, borrar la rama.

## 6. Protección de `main`
Pasos exactos en [T-015](docs/tasks/T-015-protect-main-branch.md) (👤): ruleset con PR obligatorio, checks requeridos, rama actualizada, historia lineal, sin force push, solo squash, borrar ramas al mergear.

## 7. Releases
Al cerrar cada fase del [ROADMAP](docs/ROADMAP.md): tag `v0.x.0` y `gh release create v0.x.0 --generate-notes`.

## 8. Dependabot
Maven, npm y GitHub Actions, semanal, minor/patch agrupados, prefijos `build(deps)` / `ci(deps)` (compatibles con el check de título). **Solo con CI en verde** ([T-014](docs/tasks/T-014-add-dependabot.md)).

## 9. Configuración de ejemplo
Todo archivo con valores por entorno tiene su `.example` commiteado y el real en `.gitignore`. Un cambio que agrega o renombra una variable actualiza en el mismo PR: el `.example` (con comentario), `docker-compose.yml`, `docs/SETUP.md` y el README si cambia el paso a paso.

## 10. Tests
Ver [docs/TESTING.md](docs/TESTING.md): tests en el mismo PR, bugfix con test que falla primero, nunca borrar ni debilitar tests, la cobertura no baja.
