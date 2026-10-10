# T-007 · Sacar el secreto JWT y CORS a configuración y no empaquetar env.properties
- Estado: Lista · Prioridad: P0 🔴 · Esfuerzo: M · Ejecuta: 🧠 modelo de frontera
- Fase: P0 Estabilizar
- Rama: `fix/T-007-server-security-config` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-005 · Spec/ADR: —
- Revisa: 🧠 modelo de frontera (sesión nueva) + 👤 dueño
- Título del PR: `fix(server): externalize jwt secret and cors origins`

## Por qué
- Secreto JWT hardcodeado (`jwt/JwtService.java:20`): cualquiera con el repo firma tokens válidos.
- CORS `*` (`config/CorsConfig.java:17`).
- `src/main/resources/env.properties` termina dentro del jar (`BOOT-INF/classes/env.properties`) y el `Dockerfile` de prod copia todo el contexto (auditoría §6 "Seguridad").

## Objetivo
Secreto y orígenes por entorno, con valores locales en el `.example`; el jar no contiene configuración real.

## Alcance
- Incluye: `JWT_SECRET` (Base64, ≥ 256 bits) y `JWT_EXPIRATION_MINUTES` (default 120) por `@Value`/`@ConfigurationProperties`; `CORS_ALLOWED_ORIGINS` (lista separada por comas, default `http://localhost:5173`) aplicada vía `httpSecurity.cors(...)`; mover el import a un archivo fuera del classpath (p. ej. `spring.config.import=optional:file:./env.properties,optional:classpath:env.properties` con ADR corto o nota en SETUP) **o** excluir `env.properties` del packaging; `.dockerignore` para el `Dockerfile` de prod; actualizar `.example`, compose, SETUP, README.
- **No incluye:** rotar el secreto en Render (lo hace 👤 en T-017), cambiar el algoritmo, refresh tokens.

## Leer antes
- `jwt/JwtService.java` · `config/CorsConfig.java` · `config/SecurityConfig.java:38-52` · `application.properties` · `docs/SETUP.md` §Variables

## Archivos previstos
- modificar: `JwtService.java`, `CorsConfig.java`, `SecurityConfig.java`, `application.properties`, `env.properties.example`, `docker-compose.yml`, `docs/SETUP.md`, `README.md` (variables de prod) · crear: `backend/AwareGaming/.dockerignore`, tests

## Tests
- Unitario `JwtService`: token firmado con otro secreto → inválido; expirado (con `Clock` o expiración corta) → inválido.
- Slice: preflight desde origen permitido → 200 con `Access-Control-Allow-Origin`; desde `http://evil.example` → sin header.

## Criterios de aceptación
- [ ] `git grep -n 'SECRET_KEY="' -- backend` no devuelve nada (el secreto ya no está en el código).
- [ ] `./mvnw -B clean package -DskipTests && unzip -l target/*.jar | grep env.properties` → solo el `.example` (o nada).
- [ ] Ambos modos del README siguen funcionando copiando los `.example` sin editar.
- [ ] `./scripts/verify.sh` en verde.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Tests agregados: … · Pendientes → T-016, T-017
