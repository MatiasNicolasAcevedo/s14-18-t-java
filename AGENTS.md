# AGENTS.md · Aware Gaming

Guía estable para cualquier agente (🧠 frontera o 🤖 agente gratuito de IntelliJ). Imperativa: seguila tal cual.

## 1. Proyecto
Plataforma de "juego consciente": ruleta con créditos virtuales, límites, foro y soporte; solo mayores de 18.
Monorepo: API Spring Boot + SPA React.

| Carpeta | Qué es |
|---|---|
| `backend/AwareGaming/` | API REST (`/v1/api/*`), reglas en [backend/AGENTS.md](backend/AGENTS.md) |
| `frontend/` | SPA React/Vite, reglas en [frontend/AGENTS.md](frontend/AGENTS.md) |
| `scripts/` | `verify.sh` (gate), `dev.sh` (entorno local) |
| `docs/` | estado, tablero, tareas, protocolos, auditorías |
| `docker-compose.yml` | `db` siempre; `server` y `client` con el profile `app` |

### Ejecutores
| Ícono | Ejecutor | Hace |
|---|---|---|
| 🧠 | Modelo de frontera (Claude Code) | arquitectura, seguridad, infra de tests/CI/contenedores, migraciones, specs y tareas, revisiones de riesgo, auditorías |
| 🤖 | Agente gratuito de IntelliJ (Qwen) | tareas chicas y bien especificadas, de a una, con tests; revisiones de PRs chicos sin riesgo |
| 👤 | Dueño | decide, configura GitHub, rota secretos, mergea, **cambia de agente** |

Ningún agente lanza a otro. Si el próximo paso es de otro ejecutor, **detenete** y terminá con este formato (también en `docs/STATUS.md`):

> **Próximo paso:** T-NNN · <título> · **ejecuta: 🤖 agente gratuito (IntelliJ)** | **🧠 modelo de frontera** | **👤 dueño**
> **Qué hacer:** abrí <chat nuevo del agente de IntelliJ | una sesión nueva de Claude Code | GitHub → …> y escribí: «Seguí `docs/agents/implementer.md`»

## 2. Stack (versiones reales)
- Back: Java 17 (target) con JDK 21, Spring Boot 3.2.4, Spring Security + jjwt 0.11.5, JPA (`ddl-auto=update`), PostgreSQL 16, springdoc 2.2, Lombok, Maven Wrapper 3.9.5.
- Front: Node 24, React 18.3, TypeScript 5, Vite 5.4, React Router 6, Redux Toolkit 2, Tailwind 3 + DaisyUI 4, ESLint 8 + Prettier 3.

## 3. Comandos verificados
- Setup y paso a paso: [README](README.md#levantar-el-proyecto-en-local). Variables: [docs/SETUP.md](docs/SETUP.md).
- Solo DB: `docker compose up -d --wait` · Todo en contenedores: `docker compose --profile app up -d --build --wait`
- Desarrollo: `./scripts/dev.sh` (Ctrl+C corta; `--down` apaga la DB)
- **Gate:** `./scripts/verify.sh` (`--server` / `--client`). Detalle en `.verify-logs/`.
- Un test del back (desde `backend/AwareGaming`): `./mvnw test -Dtest=Clase#metodo`
- Un test del front: todavía no hay infraestructura (T-011); cuando exista: `npx vitest run ruta/al/archivo.test.tsx`
- E2E: `scripts/e2e.sh` todavía no existe (T-013).

## 4. Protocolo de sesión
1. Leé `docs/STATUS.md` y `docs/BACKLOG.md`; mirá los PR abiertos (`gh pr list` o `git ls-remote --heads origin`).
2. **Una tarea por sesión y una a la vez:** si hay un PR de tarea abierto, no empieces otra.
3. Tomá siempre **la primera** de "Listas". Si no te corresponde (🧠 o 👤), no la saltees: avisá con el formato de Traspasos y terminá.
4. **Creá la rama con el nombre exacto de la tarea antes del primer commit**; PR draft enseguida.
5. Tests en el mismo PR. Al terminar: `verify.sh` en verde, tablero, tarea y STATUS actualizados, PR listo, sugerí sesión nueva.
Detalle: [implementer](docs/agents/implementer.md) · [reviewer](docs/agents/reviewer.md) · [auditor](docs/agents/auditor.md) (solo 🧠).

## 5. Gestión de contexto
1. **Una tarea = una sesión.** Al cerrar una tarea, revisión o auditoría, sugerí una sesión nueva (mejor que compactar).
2. Sugerí compactar **solo a mitad de un trabajo largo** y si: cerraste una sub-etapa; acumulaste logs o archivos que ya no sirven; el contexto pasa ~60 % (🧠) o ~50 % (🤖); o hay degradación (releer, olvidar decisiones, repetir intentos).
3. Antes, persistí: "Notas de implementación" de la tarea (hecho / pendiente / próximo paso), commit y push.
4. Cómo: 🧠 `/compact Conservar: tarea T-NNN, rama y PR, decisiones, archivos modificados, estado de verify y próximo paso. Descartar: logs y contenido de archivos ya procesados.` + «después escribime "seguí con T-NNN"». 🤖 (sin `/compact`): «abrí un chat nuevo y escribí: Leé `AGENTS.md` y seguí `docs/agents/implementer.md` (retomando T-NNN)».
5. No compactes justo antes de terminar ni entre tareas.
6. Higiene: salida acotada (`| tail -n 60`, logs a archivo); grep/glob y rangos de líneas; no abras lockfiles, `target/`, `node_modules/`, `dist/`, generados ni `docs/archive/`; respuestas cortas.

## 6. Configuración
- **Regla:** todo archivo con valores por entorno tiene su `.example` commiteado; el real está en `.gitignore`.
- Back: `backend/AwareGaming/src/main/resources/env.properties.example` → copiar a `…/resources/env.properties` (classpath, no la raíz del módulo).
- Front: `frontend/.env.local.example` → `frontend/.env.local`.
- Al agregar o renombrar una variable, en el mismo PR: `.example` (con comentario), `docker-compose.yml`, `docs/SETUP.md` y README si cambia el paso a paso. Valores de ejemplo inventados y válidos para local.
- Nunca leas ni commitees los archivos reales (`env.properties`, `.env.local`).

## 7. Mapa de documentación
| Archivo | Qué contiene | Cuándo leerlo |
|---|---|---|
| `docs/STATUS.md` | dónde estamos y próximo paso | siempre, primero |
| `docs/BACKLOG.md` | tablero y cola | siempre |
| `docs/tasks/T-NNN-*.md` | contrato de la tarea | al tomarla |
| `docs/agents/*.md` | protocolos de sesión | según el tipo de sesión |
| `CONTRIBUTING.md` | ramas, commits, PR, revisión | antes de commitear o revisar |
| `docs/TESTING.md` | estrategia y convenciones de tests | antes de escribir tests |
| `docs/ARCHITECTURE.md` | diagramas, modelo, endpoints | si la tarea toca varias capas |
| `docs/SETUP.md` | variables, puertos, IDE, agentes | si tocás configuración |
| `docs/ROADMAP.md` | fases y criterios de salida | al planificar (🧠) |
| `docs/audits/` | auditorías | solo la última y si la tarea lo pide |
| `docs/archive/` | histórico | **no leer** salvo que la tarea lo enlace |

## 8. Convenciones actuales (copiá el estilo de estos archivos)
- Back: controller `controller/CommentController.java` · servicio `service/CommentService.java` (+ interfaz `ICommentService`) · DTO `dto/CommentResponseDto.java` · repositorio `repository/ICommentRepository.java`. Inyección con `@Autowired` en campo (estilo actual). Paquete base `com.awaregaming.AwareGaming`.
- Tests back: hoy solo `AwareGamingApplicationTests.java`. Las referencias por tipo (unitario, `@WebMvcTest`, integración) llegan con T-005 y se listan en `docs/TESTING.md`.
- Front: componente `components/LoginForm/LoginForm.tsx` · servicio `services/user.services.ts` · hook `hooks/useUser.ts` · slice `store/users/slice.ts`. Tabs, comillas simples, alias `@/`.

## 9. Git
Ramas `<tipo>/T-NNN-slug` desde `main` actualizado · Conventional Commits en inglés con `Refs: T-NNN` · un PR chico por tarea, título Conventional Commit, squash merge por el dueño · nunca commitear a `main`. Detalle: [CONTRIBUTING.md](CONTRIBUTING.md).

## 10. Límites (no se tocan sin una tarea que lo pida)
Versiones mayores · esquema de datos/migraciones · seguridad y autenticación · deploy, Dockerfile de prod y CI · secretos y configuración de producción · borrar, saltear o debilitar tests o bajar umbrales · commitear a `main` · mergear sin revisión · trabajo "de paso" (va al Backlog).

## 11. Gotchas
- `env.properties` va en `src/main/resources/`; si falta, el back intenta MySQL y falla con `Communications link failure`.
- El único test del back levanta todo el contexto contra PostgreSQL: necesita la DB (`verify.sh` la levanta).
- El front arma `/auth/...` sin `/api` (roto hasta T-002): no "arregles" `VITE_API_URL`, se arregla en los services.
- No hay lockfile del front hasta T-003: `npm install` puede resolver versiones distintas.
- Errores del back hoy salen como 403/500 (no hay manejo global, T-009): no los tomes como bug de tu cambio.
- `mvnw` en Windows: `mvnw.cmd`. Los `.sh` necesitan Git Bash o WSL.
