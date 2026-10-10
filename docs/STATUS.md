# Estado del proyecto
_Actualizado: 2026-10-10 · por: 🧠 Claude Code · sesión: auditoría (T-000)_

## En una línea
Auditado y con harness listo: compila y levanta en contenedores, pero el login de la UI está roto, hay agujeros de seguridad 🔴 y casi no hay tests.

## Salud
| Check | Estado | Nota |
|---|---|---|
| verify.sh | ❌ | server ✅ (1 test) · client ❌ lint (5 errores) → T-001 |
| CI en main | sin CI | → T-004 |
| Levantar en local (README) | ✅ verificado 2026-10-10 | contenedores ✅ y desarrollo ✅; login UI ❌ → T-002 |
| Cobertura back / front | 34,5 % líneas / sin tests (sin umbral) | umbral en T-005 / T-011 |
| E2E smoke | no existe | → T-013 |
| Dependencias vulnerables | prod: 2 moderadas (react-router) · dev: 12 altas | → Backlog P1 |
| Seguridad | 🔴 credenciales SMTP en historial, JWT hardcodeado, sin autorización | → T-010, T-007, T-006 |
| Última auditoría | 2026-10-10 | [initial](audits/2026-10-10-initial.md) |

## Fase actual
P0 Estabilizar · 0/17 tareas · ver [ROADMAP](ROADMAP.md)

## Foco
- PR abierto (máx. 1): ninguno · T-000 mergeada ([#2](https://github.com/MatiasNicolasAcevedo/s14-18-t-java/pull/2), tag `audit/2026-10-10`)
- **Próximo paso:** T-001 · Dejar el lint del front en verde · **ejecuta: 🤖 agente gratuito (IntelliJ)**
- **Qué hacer:** abrí un chat nuevo del agente de IntelliJ (modo Agent) y escribí: «Leé `AGENTS.md` y seguí `docs/agents/implementer.md`»
- **Después:** T-002 (🤖) → T-003 (🤖) → T-004 (🧠, cambio de agente)

## Decisiones pendientes del dueño
- **Urgente:** rotar la contraseña SMTP filtrada (T-010; no bloquea la cola).
- ¿Se mantiene el deploy en Render + Firebase? (define T-017 y el Dockerfile de prod)
- ¿Qué plugin es el agente gratuito de IntelliJ? (ver `docs/SETUP.md` → Agentes; ajustar punteros si hace falta)
- Licencia del repo (propuesta: MIT).

## Últimas sesiones (máx. 5; las anteriores → archive/log/AAAA-MM.md)
- 2026-10-10 · Claude Code (🧠, sub-agente revisor) · revisó T-000: APROBADO, 5 nits aplicados · squash merge · PR [#2](https://github.com/MatiasNicolasAcevedo/s14-18-t-java/pull/2)
- 2026-10-10 · Claude Code (🧠) · auditó y montó el harness T-000 · auditoría + compose + scripts + docs + tablero · PR [#2](https://github.com/MatiasNicolasAcevedo/s14-18-t-java/pull/2)
