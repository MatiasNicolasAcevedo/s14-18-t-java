# T-014 · Activar Dependabot
- Estado: Bloqueada (por T-004) · Prioridad: P0 · Esfuerzo: S · Ejecuta: 🧠 modelo de frontera
- Fase: P0 Estabilizar
- Rama: `ci/T-014-dependabot` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-004 (CI en verde) · Spec/ADR: —
- Revisa: 🤖 agente gratuito (chat nuevo)
- Título del PR: `ci: add dependabot configuration`

## Por qué
Dependencias desactualizadas y con CVEs (auditoría §5-6) sin ningún aviso automático. Solo tiene sentido con CI que valide cada PR.

## Objetivo
`.github/dependabot.yml` con Maven, npm y GitHub Actions, semanal, minor/patch agrupados, prefijos compatibles con el check de título.

## YAML propuesto
```yaml
version: 2
updates:
  - package-ecosystem: maven
    directory: /backend/AwareGaming
    schedule: { interval: weekly }
    commit-message: { prefix: "build(deps)" }
    groups: { minor-and-patch: { update-types: [minor, patch] } }
  - package-ecosystem: npm
    directory: /frontend
    schedule: { interval: weekly }
    commit-message: { prefix: "build(deps)" }
    groups: { minor-and-patch: { update-types: [minor, patch] } }
  - package-ecosystem: github-actions
    directory: /
    schedule: { interval: weekly }
    commit-message: { prefix: "ci(deps)" }
```

## Criterios de aceptación
- [ ] El archivo valida (GitHub → Insights → Dependency graph → Dependabot sin errores).
- [ ] `CONTRIBUTING.md` §8 y la matriz de revisión siguen siendo válidas (versiones mayores → tarea 🧠).

## Resultado
- PR: #N · Qué cambió: …
