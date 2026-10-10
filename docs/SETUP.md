# Setup detallado

Complementa el [README](../README.md) (no lo repite). Comandos desde la raíz salvo que se indique otra cosa.

## Variables de configuración

### Backend (`backend/AwareGaming/src/main/resources/env.properties`, o variables de entorno)

`application.properties` hace `spring.config.import=optional:env.properties`, que se resuelve **relativo al archivo que lo importa: el classpath** (`src/main/resources/`), no la raíz del módulo. Las variables de entorno tienen prioridad sobre el archivo (así las pasa el compose).

| Nombre | Para qué | Valor local | Obligatoria | En prod (Render) |
|---|---|---|---|---|
| `DB_DBMS` | motor en la URL JDBC | `postgresql` | sí (default `mysql`) | variable de entorno |
| `DB_URL` | `host:puerto` | `localhost:5432` (compose: `db:5432`) | sí | variable |
| `DB_NAME` | base | `aware_gaming` | sí | variable |
| `DB_USER` / `DB_PASSWORD` | credenciales | `aware` / `aware_local_bca22f81` (solo local) | sí | variable secreta |
| `DB_DRIVER_CLASS_NAME` | driver JDBC | `org.postgresql.Driver` | sí (default MySQL) | variable |
| `DB_DIALECT` | dialecto Hibernate | `PostgreSQLDialect` | sí | variable |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | SMTP (Gmail fijo) del formulario de soporte | ficticios | sí (si faltan, no arranca) | variable secreta |
| `FRONTEND_URL` | reservado (hoy sin uso) | `http://localhost:5173` | sí (si falta, no arranca) | variable |

`.env_example` (en la misma carpeta) es el ejemplo viejo con valores que no funcionan: se elimina en [T-016](tasks/T-016-externalize-mail-config.md). El secreto JWT está en el código: [T-007](tasks/T-007-server-security-config.md).

### Frontend (`frontend/.env.local`)

| Nombre | Para qué | Valor local | Obligatoria | En prod (Firebase) |
|---|---|---|---|---|
| `VITE_API_URL` | base de la API; se incrusta al compilar | `http://localhost:8080/v1` | sí | `.env.production.local` o variable al correr `npm run build` antes de `firebase deploy` ([T-017](tasks/T-017-update-prod-config.md)) |

## Puertos

| Servicio | Puerto | Cómo cambiarlo |
|---|---|---|
| PostgreSQL | 5432 | en `docker-compose.yml` `ports: "5433:5432"` y `DB_URL=localhost:5433` en `env.properties` |
| Back | 8080 | `SERVER_PORT=8081 ./mvnw spring-boot:run` (y `VITE_API_URL`) |
| Front (dev) | 5173 | `npm run dev -- --port 5174` (CORS hoy acepta cualquier origen) |
| Front (contenedor) | 5173 → 80 | `ports` del servicio `client` |

## Sin Docker

Instalá PostgreSQL 16, creá usuario y base (`createuser -P aware`, `createdb -O aware aware_gaming`) con la contraseña del `.example` y seguí la opción B del README desde el paso 4.

## IDE

- **IntelliJ IDEA:** abrir la raíz del repo; importar `backend/AwareGaming/pom.xml` como proyecto Maven (SDK 21). Run configuration: `AwareGamingApplication` (lee `env.properties` del classpath, no hace falta cargar variables). Habilitar *annotation processing* (Lombok).
- **VS Code:** Extension Pack for Java + ESLint + Prettier. El front usa tabs y comillas simples (`frontend/.prettierrc`).
- **Debug del back:** `./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"` y adjuntar el debugger al 5005.

## Resetear los datos seed

El seed (`utils/DataLoader.java`) corre solo si no hay usuarios. Para empezar de cero: `docker compose down -v`, después `docker compose up -d --wait` y reiniciar el back. Usuarios: `monicavelarde@gmail.com` … contraseñas `user1` … `user10` (ver `DataLoader.java:46-171`).

## Agentes

### 🤖 Agente gratuito de IntelliJ (modelo Qwen)

⚠️ No verificado qué plugin es exactamente ni qué archivo de instrucciones lee solo. Cubierto así:
- **JetBrains AI Assistant / Junie**: leen `AGENTS.md` de la raíz. Las *project rules* de AI Assistant (`.aiassistant/rules/`) apuntan a `AGENTS.md`.
- **Tongyi Lingma** (Qwen): reglas en `.lingma/rules/`; hay un puntero a `AGENTS.md`. En la configuración de la regla elegí "Always apply".
- **Qwen Code (ACP)**: lee `QWEN.md` por defecto; no se creó: la frase de arranque cubre todos los casos.

**Frase de arranque (siempre):** «Leé `AGENTS.md` y seguí `docs/agents/implementer.md`».

Uso:
1. **Chat nuevo** por tarea o revisión (no hay `/compact`: compactar = chat nuevo, después de persistir notas).
2. Modo **Agent** (no solo chat), para que edite archivos y corra comandos.
3. Permitir comandos de terminal (en la configuración del plugin, *allow terminal / run commands*). Comandos que necesita: `./scripts/verify.sh`, `./mvnw test -Dtest=…`, `npm run lint`, `git …`.
4. **Git:** crea la rama, commitea y hace `git push -u origin <rama>`. No tiene `gh` ni MCP: deja el **link de comparación** `https://github.com/MatiasNicolasAcevedo/s14-18-t-java/compare/main...<rama>?expand=1` con título y cuerpo listos. El 👤 dueño abre el PR en draft desde ese link.

### 🧠 Modelo de frontera (Claude Code)

Sesión nueva de Claude Code en la raíz del repo. Lee `CLAUDE.md` → `AGENTS.md`. Permisos seguros en `.claude/settings.json`. Tiene `gh` o MCP de GitHub para abrir y revisar PRs.
