# Backend · Aware Gaming (Spring Boot)

API REST en `backend/AwareGaming/` (Java 17, compila con JDK 21; Spring Boot 3.2). Para levantar todo el proyecto, ver el [README raíz](../README.md).

## Configurar y correr (desde `backend/AwareGaming`)

1. Copiar la configuración local (valores válidos tal cual):

```bash
cp src/main/resources/env.properties.example src/main/resources/env.properties
```

2. Levantar PostgreSQL (desde la raíz del repo):

```bash
docker compose up -d --wait
```

**Resultado esperado:** `Container aware-gaming-db-1 Healthy`.

3. Correr la API:

```bash
./mvnw spring-boot:run
```

**Resultado esperado:** `Started AwareGamingApplication`; `curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8080/v3/api-docs` → `200`. Swagger en <http://localhost:8080/swagger-ui/index.html>.

## Comandos

| Qué | Comando (desde `backend/AwareGaming`) |
|---|---|
| Build + tests (necesita la DB) | `./mvnw -B clean verify` |
| Solo tests | `./mvnw test` |
| Un test (clase) | `./mvnw test -Dtest=AwareGamingApplicationTests` |
| Un test (método) | `./mvnw test -Dtest=AwareGamingApplicationTests#contextLoads` |
| Cobertura (sin tocar el pom) | `./mvnw clean org.jacoco:jacoco-maven-plugin:0.8.15:prepare-agent verify org.jacoco:jacoco-maven-plugin:0.8.15:report` → `target/site/jacoco/index.html` |
| Gate completo | `../../scripts/verify.sh --server` |

## Estructura (`src/main/java/com/awaregaming/AwareGaming`)

| Carpeta | Contenido |
|---|---|
| `auth/` | login y registro (`AuthController`, `AuthService`) |
| `jwt/` | generación y filtro de JWT |
| `config/` | Security, CORS, `PasswordEncoder` |
| `controller/` | endpoints `/v1/api/*` |
| `service/` | lógica (interfaz `IXService` + implementación) |
| `repository/` | Spring Data JPA |
| `model/`, `dto/` | entidades y DTOs |
| `utils/DataLoader.java` | seed al arrancar si no hay usuarios |

Producción (Render) usa `Dockerfile`; en local, `Dockerfile.dev` (lo usa el compose). Reglas para agentes: [AGENTS.md](AGENTS.md).
