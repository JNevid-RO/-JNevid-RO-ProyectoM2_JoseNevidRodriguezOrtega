# MiniBlog API

## 📌 Descripción del proyecto

MiniBlog API es una API REST desarrollada con Node.js y Express que permite gestionar autores y posts, utilizando PostgreSQL como base de datos.

La API permite realizar operaciones CRUD sobre:
- Autores (`/authors`)
- Posts (`/posts`)

---

## ⚙️ Requisitos

- Node.js (v18 o superior)
- npm
- PostgreSQL
- Cliente SQL (pgAdmin o psql)

---

## 🚀 Ejecución local

### 1. Clonar repositorio

bash:
git clone <tu-repo-url>
cd miniblog-api

### 2. Instalar dependencias
bash: npm install

### 3. Configurar variables de entorno
Crear archivo .env en la raíz del proyecto:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=miniblog
PORT=3000

### 4. Ejecutar script SQL

Crear la base de datos y tablas ejecutando:

bash:  psql -h localhost -U postgres -d postgres -f scripts/setup.sql

### 5. Ejecutar la aplicación
bash:  npm run dev 

## Cómo ejecutar tests
bash: npm test

Se utilizan Jest y Supertest para validar los endpoints principales de la API.

Documentación OpenAPI (Swagger)
La documentación de la API está disponible en:
docs/openapi.yaml
Swagger UI en producción:
https://jnevid-ro-proyectom2josenevidrodriguezortega-production.up.railway.app/api-docs

## Deployment en Railway
### 1. Configuración del proyecto

Proyecto desplegado en Railway

Servicio Node.js + PostgreSQL

### 2. Variables de entorno (en el servicio de la app)
PORT=3000

DB_HOST=${PGHOST}
DB_PORT=${PGPORT}
DB_USER=${PGUSER}
DB_PASSWORD=${PGPASSWORD}
DB_NAME=${PGDATABASE}

### 3. URLs del proyecto

 Public URL:

https://jnevid-ro-proyectom2josenevidrodriguezortega-production.up.railway.app

Internal URL (uso interno Railway):

jnevid-ro-proyectom2-josenevidr.railway.internal

### 4. Base de datos

Se utilizó PostgreSQL en Railway.

Para inicializar la base de datos, se ejecutó:

scripts/setup.sql 

## Registro del uso de IA:

Durante el desarrollo del proyecto se utilizó inteligencia artificial (ChatGPT y GitHub Copilot) para:

Resolver errores (por ejemplo, error 500 por configuración de variables de entorno) 

Promp utilizado: Me sale un error 500 en mi API de Express al hacer una petición GET, revisa posibles causas relacionadas con la conexión a la base de datos y dotenv.

Asistir en la integración con PostgreSQL

Promp utilizado: Muéstrame paso a paso cómo conectar una API de Node.js con PostgreSQL

Apoyar en la configuración de Railway

Promp utilizado: Explícame paso a paso cómo desplegar una API de Node.js con PostgreSQL en Railway y cómo conectar las variables de entorno.

Generar documentación (README y OpenAPI)

Promps utilizados: Ayudame con la estructura de mi archivo README.api  /  Como utilizar SWAGGER con OpenAPI