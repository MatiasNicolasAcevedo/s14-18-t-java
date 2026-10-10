# T-000 · Bootstrap del harness para agentes y auditoría inicial
- Estado: Hecha · Prioridad: P0 · Esfuerzo: L · Ejecuta: 🧠 modelo de frontera
- Fase: P0 Estabilizar
- Rama: `chore/T-000-agent-bootstrap` · Depende de: — · Spec/ADR: —
- Revisa: 🧠 modelo de frontera (sesión nueva) + 👤 dueño
- Título del PR: `chore: bootstrap agent harness and project audit`

## Por qué
Proyecto de 2024 sin cómo levantarlo, sin tests ni CI y sin estado persistido para retomarlo con agentes.

## Objetivo
Auditoría inicial + harness (compose, `.example`, `verify.sh`, `dev.sh`), docs y tablero vivo para trabajar de a una tarea con 🤖/🧠.

## Alcance
- Incluye: docs, `.example`, compose y Dockerfiles de desarrollo, scripts, toolchain, `.github/` (template y check de título), `.claude/settings.json`.
- **No incluye:** código de la aplicación, configuración de producción, versiones, CI de verify (T-004).

## Resultado
- PR: [#2](https://github.com/MatiasNicolasAcevedo/s14-18-t-java/pull/2)
- Qué cambió: ver la descripción del PR y `docs/audits/2026-10-10-initial.md`.
- Pendientes → T-001 … T-017.
