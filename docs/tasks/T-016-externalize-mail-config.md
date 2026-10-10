# T-016 · Sacar host y puerto SMTP a configuración y borrar el `.env_example` viejo
- Estado: Bloqueada (por T-007) · Prioridad: P0 · Esfuerzo: S · Ejecuta: 🤖 agente gratuito
- Fase: P0 Estabilizar
- Rama: `fix/T-016-mail-config` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-007 (toca los mismos archivos de configuración) · Spec/ADR: —
- Revisa: 🧠 modelo de frontera (es configuración)
- Título del PR: `fix(server): make smtp host and port configurable`

## Por qué
`application.properties:20-21,27` fija `smtp.gmail.com:587`; en local el soporte no puede probarse. `src/main/resources/.env_example` tiene valores que no funcionan y duplica `env.properties.example` (auditoría §3 "Configuración").

## Objetivo
`MAIL_HOST` y `MAIL_PORT` configurables con default Gmail; un solo `.example` en el back.

## Alcance
- Incluye: en `application.properties`, `spring.mail.host=${MAIL_HOST:smtp.gmail.com}`, `spring.mail.port=${MAIL_PORT:587}` y `spring.mail.properties.mail.smtp.ssl.trust=${MAIL_HOST:smtp.gmail.com}`; agregar ambas variables (comentadas) a `env.properties.example` y al servicio `server` del `docker-compose.yml`; filas nuevas en `docs/SETUP.md`; `git rm backend/AwareGaming/src/main/resources/.env_example` y quitar su mención en SETUP.
- **No incluye:** agregar Mailpit al compose (Backlog P1), cambiar `SupportContactService`.

## Leer antes
- `application.properties` (34 líneas) · `env.properties.example` · `docker-compose.yml` (servicio `server`) · `docs/SETUP.md` §Variables

## Tests
- Sin tests nuevos (configuración). Verificación por arranque.

## Criterios de aceptación
- [ ] `./scripts/dev.sh` arranca con el `.example` copiado sin editar.
- [ ] `git ls-files backend/AwareGaming/src/main/resources/.env_example` vacío.
- [ ] `./scripts/verify.sh` en verde.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: …
