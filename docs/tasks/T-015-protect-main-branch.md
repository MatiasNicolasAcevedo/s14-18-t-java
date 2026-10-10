# T-015 · Proteger `main` y limpiar ramas
- Estado: Bloqueada (por T-004) · Prioridad: P0 · Esfuerzo: S · Ejecuta: 👤 dueño
- Fase: P0 Estabilizar
- Rama: — · Depende de: T-004 (para exigir los checks de CI) · Spec/ADR: —
- Revisa: —

## Pasos en GitHub (👤)
1. **Settings → General → Pull Requests:** dejar solo **Allow squash merging** (desmarcar merge commits y rebase); marcar **Automatically delete head branches**; "Default commit message" → *Pull request title*.
2. **Settings → Rules → Rulesets → New branch ruleset:** nombre `main`, Enforcement **Active**, Target `Include default branch`. Reglas:
   - **Restrict deletions** y **Block force pushes**.
   - **Require linear history**.
   - **Require a pull request before merging** (aprobaciones requeridas: 0 mientras no haya cuenta bot ni otro humano; los agentes revisan con comentario).
   - **Require status checks to pass** → **Require branches to be up to date** → agregar `server` y `client` (del workflow `CI`) y `conventional-title` (de `PR title`).
   - Bypass: nadie (o solo vos, para emergencias).
3. Borrar ramas ya mergeadas: `git fetch --prune && git branch -r --merged origin/main | grep -v 'origin/main$' | sed 's#origin/##' | xargs -r -n1 git push origin --delete` (hoy borra `feat/add-swagger` y `claude/new-session-xpvyh0`, ambas ya mergeadas).

## Criterios de aceptación
- [ ] Un `git push origin main` directo es rechazado.
- [ ] Un PR con CI en rojo no se puede mergear.
- [ ] `git ls-remote --heads origin` muestra solo `main` y ramas de tareas abiertas.

## Resultado
- Fecha: … · Notas: …
