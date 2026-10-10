<div align="center">
  <a href="https://aware-gaming.web.app/" target="_blank">
    <img src="https://github.com/MatiasNicolasAcevedo/s14-18-t-java/assets/109118183/51f7ee94-94a5-489e-a876-a227f4877a43" alt="Banner de Aware Gaming">
  </a>
  <h1>🤯 Aware Gaming 🎮</h1>
  <p>Plataforma de juego responsable: ruleta con créditos virtuales, límites de apuesta, comunidad y soporte para quienes enfrentan dificultades con el juego.</p>
  <p>
    <img src="https://img.shields.io/badge/Java-17%20(JDK%2021)-orange" alt="Java">
    <img src="https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F" alt="Spring Boot">
    <img src="https://img.shields.io/badge/React-18-61DAFB" alt="React">
    <img src="https://img.shields.io/badge/PostgreSQL-16-336791" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/CI-pendiente%20(T--004)-lightgrey" alt="CI">
  </p>
</div>

> Proyecto hecho en equipo para la simulación laboral de [No Country](https://www.nocountry.tech) (2024) y retomado como pieza de portfolio: tests, CI, contenedores y flujo con agentes de IA. Estado actual en [docs/STATUS.md](docs/STATUS.md).

## Qué resuelve

En lugar de fomentar el juego impulsivo, Aware Gaming premia jugar de forma moderada: créditos virtuales (nunca dinero real), límites de apuesta, estadísticas de tiempo jugado y una comunidad de apoyo.

- ✅ Registro solo para mayores de 18 e inicio de sesión con JWT
- ✅ Panel de usuario y edición de perfil
- ✅ Ruleta **Spin Wise** con 13 modos de apuesta y límites
- ✅ Recarga automática diaria de 100 créditos
- 🚧 Foro con comentarios (API lista; la UI muestra datos fijos)
- 🚧 Formulario de soporte (API lista, sin UI)
- 🚧 Estadísticas de horas jugadas (gráfico con datos fijos)
- 🚧 Dice Aware (dados: API parcial) y Slot Care (tragamonedas)

Diseño en [Figma](https://www.figma.com/design/ynNFMZSNhqUll7grrDczVd/casino-game?node-id=1-20&t=J49y7Z30PuRI2qvU-1) · [Video promocional](https://youtu.be/xdvnvosPAFk) · [Video demostración](https://youtu.be/3QSkQjY1r84) · Demo: [aware-gaming.web.app](https://aware-gaming.web.app/) (⚠️ no verificada en 2026)

## Stack

| Parte | Tecnologías |
|---|---|
| Backend (`backend/AwareGaming`) | Java 17 (compila y corre con JDK 21), Spring Boot 3.2.4, Spring Security + JWT (jjwt 0.11), JPA/Hibernate, PostgreSQL, springdoc (Swagger), Maven Wrapper |
| Frontend (`frontend`) | React 18, TypeScript, Vite 5, React Router 6, Redux Toolkit, Tailwind CSS 3 + DaisyUI, Recharts |
| Infra | Docker Compose (PostgreSQL 16, back y front), deploy original en Render + Firebase Hosting |

Arquitectura, modelo de datos y endpoints: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Levantar el proyecto en local

### Prerrequisitos

| Herramienta | Versión | Cómo comprobarla | Cómo instalarla |
|---|---|---|---|
| Git | cualquiera reciente | `git --version` | [git-scm.com](https://git-scm.com/downloads) |
| Docker + Compose v2 | Docker 24+ | `docker compose version` | [Docker Desktop](https://docs.docker.com/get-docker/) o Docker Engine |
| JDK *(solo opción B)* | 21 | `java -version` | [SDKMAN](https://sdkman.io): `sdk env install` (lee `.sdkmanrc`) |
| Node.js *(solo opción B)* | 24 LTS (también funciona 22) | `node -v` | [nvm](https://github.com/nvm-sh/nvm): `nvm install` (lee `.nvmrc`) |

Para la **opción A** alcanza con Git + Docker.

### Configurar variables de entorno

Cada parte tiene un archivo de ejemplo commiteado con valores **que sirven tal cual para local** (coinciden con `docker-compose.yml`). El archivo real está en `.gitignore`.

| Archivo de ejemplo | Copiar a | Quién lo lee | Qué contiene |
|---|---|---|---|
| `backend/AwareGaming/src/main/resources/env.properties.example` | `backend/AwareGaming/src/main/resources/env.properties` | Spring (`spring.config.import`, desde el classpath) | conexión a PostgreSQL, SMTP ficticio |
| `frontend/.env.local.example` | `frontend/.env.local` | Vite | `VITE_API_URL` del back local |

Desde la raíz del repo:

```bash
cp backend/AwareGaming/src/main/resources/env.properties.example backend/AwareGaming/src/main/resources/env.properties
```

```bash
cp frontend/.env.local.example frontend/.env.local
```

En producción hay que definir en el proveedor (solo nombres): `DB_DBMS`, `DB_URL`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_DRIVER_CLASS_NAME`, `DB_DIALECT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `FRONTEND_URL` (back) y `VITE_API_URL` (front, al compilar). Detalle de cada variable en [docs/SETUP.md](docs/SETUP.md).

### Opción A · Todo en contenedores (la más simple)

1. Clonar y entrar al repo:

```bash
git clone https://github.com/MatiasNicolasAcevedo/s14-18-t-java.git
```

```bash
cd s14-18-t-java
```

2. Levantar base, back y front (la primera vez tarda unos minutos en compilar):

```bash
docker compose --profile app up -d --build --wait
```

**Resultado esperado:** `Container aware-gaming-db-1 Healthy`, `aware-gaming-server-1 Healthy` y `aware-gaming-client-1 Healthy` (~1 min con imágenes en caché).

3. Abrir:
   - Front: <http://localhost:5173>
   - Swagger: <http://localhost:8080/swagger-ui/index.html>
   - Usuario de prueba (seed): `monicavelarde@gmail.com` / `user1`

   ⚠️ **Hoy el login desde la UI falla** (la UI llama a `/v1/auth/login`, que no existe): ver [T-002](docs/tasks/T-002-fix-client-auth-endpoints.md). El login por API funciona:

```bash
curl -s -X POST http://localhost:8080/v1/api/auth/login -H 'Content-Type: application/json' -d '{"email":"monicavelarde@gmail.com","password":"user1"}'
```

**Resultado esperado:** `{"data":{"token":"eyJ..."},"message":"Welcome to AwareGaming"}`

4. Apagar y borrar los datos:

```bash
docker compose --profile app down -v
```

En este modo no hace falta copiar los `.example`: el compose ya trae las variables.

### Opción B · Desarrollo (DB en contenedor, back y front locales con hot reload)

**Inicio rápido**, desde la raíz (copia los `.example` si faltan, levanta todo y espera los health checks; `Ctrl+C` corta back y front):

```bash
./scripts/dev.sh
```

**Resultado esperado:** `✅ Todo arriba` con las URLs y el usuario demo. Para apagar la base: `./scripts/dev.sh --down`.

**Paso a paso** (lo mismo que hace `dev.sh`):

1. **Fijar versiones de Java y Node** (desde la raíz). Si `sdk env install` dice que la versión no existe, usá la última `21.x-tem` de `sdk list java`.

```bash
sdk env install
```

```bash
nvm install
```

**Resultado esperado:** `java -version` muestra 21 y `node -v` muestra v24.

2. **Copiar los `.example`** (los dos comandos de la sección anterior).

3. **Levantar la base:**

```bash
docker compose up -d --wait
```

**Resultado esperado:** `Container aware-gaming-db-1 Healthy`.

4. **Levantar el back** (en una terminal nueva, desde `backend/AwareGaming`; la primera vez descarga dependencias):

```bash
./mvnw spring-boot:run
```

**Resultado esperado:** `Started AwareGamingApplication in … seconds`. Comprobalo desde otra terminal:

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8080/v3/api-docs
```

→ `200`. El seed (10 usuarios, posts y comentarios) se carga al arrancar si la base está vacía.

5. **Levantar el front** (en otra terminal, desde `frontend`):

```bash
npm install
```

```bash
npm run dev
```

**Resultado esperado:** `Local: http://localhost:5173/`. Abrila: la landing carga y las llamadas van a `http://localhost:8080/v1` (lo define `frontend/.env.local`).

6. **Iniciar sesión** con `monicavelarde@gmail.com` / `user1`. ⚠️ Hoy falla: ver [T-002](docs/tasks/T-002-fix-client-auth-endpoints.md) (usá el `curl` de la opción A para comprobar el back).

7. **Verificar todo** (desde la raíz):

```bash
./scripts/verify.sh
```

**Resultado esperado:** un resumen tipo `server: ✅ build ✅ tests (1) [JDK 21] · client: ✅ lint ✅ build`. ⚠️ Hoy el lint del front falla: ver [T-001](docs/tasks/T-001-fix-client-lint-errors.md).

8. **Apagar y limpiar:** `Ctrl+C` en las terminales del back y del front, y desde la raíz:

```bash
docker compose down -v
```

### Windows

- Usá **Git Bash** o **WSL** para los `.sh`; en PowerShell/CMD, `mvnw.cmd spring-boot:run` en lugar de `./mvnw`.
- `copy` en lugar de `cp` (ej.: `copy frontend\.env.local.example frontend\.env.local`).
- Antes de clonar: `git config --global core.autocrlf input` (los `.sh` tienen que quedar con fin de línea LF).
- SDKMAN y nvm no corren en Windows nativo: instalá JDK 21 ([Adoptium](https://adoptium.net)) y Node 24 ([nodejs.org](https://nodejs.org) o nvm-windows).

### Problemas frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| `./mvnw: Permission denied` | wrapper sin bit de ejecución (clones viejos) | `chmod +x backend/AwareGaming/mvnw` o `sh ./mvnw …` |
| `Communications link failure` (MySQL) o `Connection refused` | falta `env.properties` (usa el default MySQL) o la base no está levantada | copiar el `.example` a `src/main/resources/` y `docker compose up -d --wait` |
| `Could not resolve placeholder 'MAIL_USERNAME'` | `env.properties` en otra ruta (p. ej. la raíz del módulo) | tiene que estar en `backend/AwareGaming/src/main/resources/` |
| `Bind for 0.0.0.0:5432 failed: port is already allocated` | hay otro PostgreSQL local | apagarlo o cambiar el puerto publicado (ver [SETUP](docs/SETUP.md#puertos)) |
| Login desde la UI responde 403 | rutas de auth del front desactualizadas | [T-002](docs/tasks/T-002-fix-client-auth-endpoints.md) |
| El front llama a Render/otra URL | `VITE_API_URL` viejo o falta `.env.local` | copiar el `.example` y reiniciar `npm run dev` |
| Login con usuario demo falla justo al arrancar | el seed todavía no terminó | esperar a `Started AwareGamingApplication` |
| `release version 17 not supported` | JDK menor a 17 | usar JDK 21 (`sdk env install`) |

Verificado el 2026-10-10 en Ubuntu 24.04 con Java 21.0.12, Node 22.22 y 24.21, Docker 29.8.2 (Compose 5.6.0).

## Tests y calidad

`./scripts/verify.sh` (o `--server` / `--client`) compila con `clean`, corre lint y tests y deja el detalle en `.verify-logs/`. Hoy hay **1 test** en el back y ninguno en el front: la estrategia y el plan están en [docs/TESTING.md](docs/TESTING.md).

## Cómo se trabaja

Flujo de ramas, commits y PR en [CONTRIBUTING.md](CONTRIBUTING.md). El repo está preparado para desarrollo asistido por agentes ([AGENTS.md](AGENTS.md)): 🤖 el agente gratuito de IntelliJ toma tareas chicas y bien especificadas y 🧠 un modelo de frontera (Claude Code) se encarga de lo complejo.

## Estado y roadmap

[docs/STATUS.md](docs/STATUS.md) · [docs/ROADMAP.md](docs/ROADMAP.md) · [docs/BACKLOG.md](docs/BACKLOG.md) · [auditoría inicial](docs/audits/2026-10-10-initial.md)

## Capturas

<div align='center'>
   <img src="https://github.com/MatiasNicolasAcevedo/s14-18-t-java/assets/109118183/2c15352c-dc24-4391-9844-7dba2560e218" alt="Captura de Aware Gaming" width="585" height="270">
</div>

<div align='center'>
   <img src="https://github.com/MatiasNicolasAcevedo/s14-18-t-java/assets/109118183/d6844fdb-329c-4cfe-8f1c-bc15347f58a9" alt="Captura de Aware Gaming" width="585" height="270">
</div>

<div align='center'>
   <img src="https://github.com/MatiasNicolasAcevedo/s14-18-t-java/assets/109118183/ce2c13bb-82c6-4a5d-80dd-796a2dd0d352" alt="Captura de Aware Gaming" width="585" height="270">
</div>

<div align='center'>
   <img src="https://github.com/MatiasNicolasAcevedo/s14-18-t-java/assets/109118183/9b65d66a-5a62-4d7f-9f54-a5e611a15122" alt="Captura de Aware Gaming" width="585" height="270">
</div>

<div align='center'>
   <img src="https://github.com/MatiasNicolasAcevedo/s14-18-t-java/assets/109118183/41bf42bb-4c4c-42dd-8eb9-b0adc38c6509" alt="Captura de Aware Gaming" width="585" height="270">
</div>

<br>

<details>
<summary>Swagger y diagrama originales (2024)</summary>

<img src="https://github.com/MatiasNicolasAcevedo/s14-18-t-java/assets/109118183/0f78bbd5-d7b3-40a7-80ee-f8f8c896c632" alt="Swagger" width="600">
<img src="https://github.com/MatiasNicolasAcevedo/s14-18-t-java/assets/109118183/3f250522-644d-496d-b9b7-2b9b70922cd0" alt="Diagrama original" width="600">
</details>

## Equipo y licencia

Creado por el equipo **s14-18-t-java** de No Country. Mantenimiento actual: [Matias Acevedo](https://github.com/MatiasNicolasAcevedo). Sin licencia definida todavía (ver Backlog P3).



<table align="center">
  <tr>
    <td align="center">
    <h3 align="center">Team Leader </h3>
      <img src="https://github.com/VickyNata.png" alt="Victoria Natalini" height=200 width=200>
      <br>
      <strong>Victoria Natalini</strong>
      <br>
      <a href="https://www.linkedin.com/in/victoria-natalini/">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
        &nbsp;
      <a href="https://github.com/VickyNata">
        <img src="https://img.shields.io/badge/GitHub-grey?logo=github" alt="GitHub">
      </a>    
    </td>
    <td align="center">
    <h3 align="center">QA Tester</h3>
      <img src="https://github.com/Yosmarli.png" alt="Yosmarli Parica" height=200 width=200>
      <br>
      <strong>Yosmarli Parica</strong>
      <br>
      <a href="https://www.linkedin.com/in/yosmarli-parica-1156461a2/">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
        &nbsp;
      <a href="https://github.com/Yosmarli">
        <img src="https://img.shields.io/badge/GitHub-grey?logo=github" alt="GitHub">
      </a>    
    </td>
   <td align="center">
      <h3 align="center">Diseño UX/UI</h3>
      <img src="https://mir-s3-cdn-cf.behance.net/user/115/9b766750848311.6553a5ba8744a.jpg" alt="Diego Gonzalez" height=200 width=200>
      <br>
      <strong>Diego Gonzalez</strong>
      <br>
      <a href="https://www.linkedin.com/in/diego-gonzalez-7937aa16/">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
         &nbsp;
      <a href="https://www.behance.net/ushiwushi">
        <img src="https://img.shields.io/badge/behance-1769FF?logo=behance" alt="behance">
      </a>    
    </td>
    <td align="center">
     <h3 align="center">Diseño UX/UI</h3>
      <img src="https://mir-s3-cdn-cf.behance.net/user/115/59bdc71638277815.6599920decaf8.jpg" alt="Lucia Harillo" height=200 width=200>
      <br>
      <strong>Lucia Harillo</strong>
      <br>
      <a href="https://www.linkedin.com/in/luciamarcelaharillo/" alt="LinkedIn">
      <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
        &nbsp;
      <a href="https://www.behance.net/luciamarcelaharillo">
        <img src="https://img.shields.io/badge/behance-1769FF?logo=behance" alt="behance">
      </a>    
    </td>
    </tr>
 
   <tr>
    <td align="center">
     <h3 align="center">Frontend</h3>
      <img src="https://github.com/alefernandez88.png" alt="Alejandro Fernández" height=200 width=200>
      <br>
      <strong>Alejandro Fernández</strong>
      <br>
      <a href="https://www.linkedin.com/in/alefernandez88/">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
        &nbsp;
      <a href="https://github.com/alefernandez88">
        <img src="https://img.shields.io/badge/GitHub-grey?logo=github" alt="GitHub">
      </a>    
    </td>
    <td align="center">
     <h3 align="center">Frontend</h3>
      <img src="https://github.com/aracely33.png" alt="Aracely Cruz Del Angel" height=200 width=200>
      <br>
      <strong> Aracely Cruz Del Angel</strong>
      <br>
      <a href="https://www.linkedin.com/in/aracruzdelangel/">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
        &nbsp;
      <a href="https://github.com/aracely33">
        <img src="https://img.shields.io/badge/GitHub-grey?logo=github" alt="GitHub">
      </a>    
    </td>
    <td align="center">
     <h3 align="center">Frontend</h3>
      <img src="https://github.com/rolando22.png" alt="Rolando Castañon Fernández" height=200 width=200>
      <br>
      <strong> Rolando Fernández</strong>
      <br>
      <a href="https://www.linkedin.com/in/rolando-rafael-casta%C3%B1on-fern%C3%A1ndez-973917252/">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
        &nbsp;
      <a href="https://github.com/rolando22">
        <img src="https://img.shields.io/badge/GitHub-grey?logo=github" alt="GitHub">
      </a>    
    </td>
   <td align="center">
     <h3 align="center">Backend</h3>
      <img src="https://i.imgur.com/4QkZTuR.png" alt="Hans Urpay" height=200 width=200>
      <br>
      <strong>Hans Urpay</strong>
      <br>
      <a href="https://www.linkedin.com/in/hans-urpay/">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
       &nbsp;
      <a href="https://github.com/HansUrpay">
        <img src="https://img.shields.io/badge/GitHub-grey?logo=github" alt="GitHub">
      </a>    
    </td>
  </tr>
  <tr>
    <td align="center">
     <h3 align="center">Backend</h3>
      <img src="https://github.com/MatiasNicolasAcevedo.png" alt="Matias Acevedo" height=200 >
      <br>
      <strong>Matias Acevedo</strong>
      <br>
      <a href="https://www.linkedin.com/in/matias-nicolas-acevedo/">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
        &nbsp;
      <a href="https://github.com/MatiasNicolasAcevedo">
        <img src="https://img.shields.io/badge/GitHub-grey?logo=github" alt="GitHub">
      </a>    
    </td>
   <td align="center">
     <h3 align="center">Backend</h3>
      <img src="https://github.com/rubenledesma10.png" alt="Rubén Ledesma" height=200 width=200>
      <br>
      <strong>Rubén Ledesma</strong>
      <br>
      <a href="https://www.linkedin.com/in/rubén-ledesma/">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
        &nbsp;
      <a href="https://github.com/rubenledesma10">
        <img src="https://img.shields.io/badge/GitHub-grey?logo=github" alt="GitHub">
      </a>    
    </td>
    <td align="center">
     <h3 align="center">Backend</h3>
      <img src="https://github.com/SantiagoFigli.png" alt="Santiago Figliuolo" height=200 width=200>
      <br>
      <strong>Santiago Figliuolo</strong>
      <br>
      <a href="https://www.linkedin.com/in/santiago-figliuolo">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a> 
        &nbsp;
      <a href="https://github.com/SantiagoFigli">
        <img src="https://img.shields.io/badge/GitHub-grey?logo=github" alt="GitHub">
      </a> 
    </td>
    </tr>
</table>

