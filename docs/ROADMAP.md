# Roadmap

Fases en orden. Una fase se cierra cuando cumple su **criterio de salida** y se publica un release (`v0.x.0`).

## P0 · Estabilizar → `v0.1.0`
**Objetivo:** que cualquiera lo levante, que esté protegido por tests y sin agujeros críticos.
**Criterio de salida (verificable):**
- `./scripts/verify.sh` en verde con JDK 21 y Node 24, y CI en verde en `main`.
- `docker compose --profile app up` levanta todo; login desde la UI funciona en ambos modos del README sin ⚠️.
- `.example` completos; README verificado de punta a punta.
- Seguridad crítica resuelta: credenciales rotadas, JWT por entorno, autorización por rol/dueño, apuestas validadas.
- Infra de tests back/front/E2E con umbral de cobertura, y los flujos críticos de la auditoría caracterizados.
- `main` protegida.
**Tareas:** T-001 … T-017 (ver [BACKLOG](BACKLOG.md)).

## P1 · Actualizar → `v0.2.0`
**Objetivo:** versiones vigentes en pasos chicos, protegidos por la red de P0.
**Criterio de salida:** Spring Boot 4.x, Java 21 de target, jjwt 0.13, Flyway; React 19, Vite actual, router 7, ESLint flat config; `npm audit --omit=dev` sin altas; Dependabot activo.
**Tareas:** Boot 3.2 → 3.5 → 4.x (evaluar OpenRewrite), Java 21, Flyway (ADR), front por pasos (Vite → React → router → ESLint → Tailwind 4).

## P2 · Terminar → `v0.3.0`
**Objetivo:** que las features prometidas en el README funcionen de punta a punta, cada una con su spec y sus tests.
**Criterio de salida:** foro y comentarios conectados a la API; formulario de soporte; Dice Aware con UI y pago correcto; estadísticas reales de tiempo jugado; historial de jugadas visible.

## P3 · Pulir para portfolio → `v1.0.0`
**Objetivo:** presentable.
**Criterio de salida:** sin scroll horizontal a 375/768 px; a11y básica (labels, alt, foco, contraste); cobertura ≥ 70 % en servicios y lógica de front; README con capturas actuales, badges de CI y cobertura, licencia; demo online verificada.
