# 🐳 Guía de Ejecución con Docker - Ecommerce Vintage

## Requisitos Previos

- **Docker Desktop** instalado ([descargar aquí](https://www.docker.com/products/docker-desktop))
- **Docker Compose** (incluido en Docker Desktop)
- Git (opcional)

## 🚀 Inicio Rápido

### 1. Clonar o descargar el proyecto

```bash
git clone <tu-repositorio>
cd ecommerce-vintage
```

### 2. Construir y ejecutar los contenedores

```bash
docker-compose up --build
```

Este comando:
- ✅ Construye la imagen de la API (Backend .NET)
- ✅ Construye la imagen del Frontend (React + Nginx)
- ✅ Crea y levanta un contenedor MySQL con la base de datos
- ✅ Inicializa la base de datos con datos de prueba
- ✅ Configura todas las conexiones entre servicios

### 3. Acceder a la aplicación

Una vez que veas mensajes como:
```
vintage_api    | info: Microsoft.Hosting.Lifetime[0]
vintage_api    |       Now listening on: http://+:80
vintage_web    | /docker-entrypoint.sh: Configuration complete; ready for start up
```

Abre tu navegador en:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:3000 | Aplicación React |
| **API** | http://localhost:5000 | Backend API |
| **Swagger** | http://localhost:5000/swagger | Documentación API |
| **Base de Datos** | localhost:3307 | MySQL (usuario: user, contraseña: password) |

## 🧪 Datos de Prueba

La base de datos se inicializa automáticamente con:

### Usuarios de Prueba (16 usuarios)

**Administradores (3):**
- Username: `luciano.admin` | Contraseña: `admin123`
- Username: `maria.admin` | Contraseña: `admin123`

**Empleados (5):**
- Username: `ana.employee` | Contraseña: `emp123`
- Username: `diego.employee` | Contraseña: `emp123`

**Clientes (12):**
- Username: `martin.client` | Contraseña: `client123`
- Username: `valentina.client` | Contraseña: `client123`

## 🛑 Detener los contenedores

```bash
docker-compose down
```

Para detener y eliminar volúmenes de datos:
```bash
docker-compose down -v
```

## 🔄 Comandos Útiles

### Ver logs de todos los servicios
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico
```bash
docker-compose logs -f api      # API Backend
docker-compose logs -f web      # Frontend
docker-compose logs -f db       # Base de datos
```

### Reiniciar un servicio
```bash
docker-compose restart api
```

### Ejecutar comando en un contenedor
```bash
docker-compose exec api dotnet ef migrations list
```

### Reconstruir sin cache
```bash
docker-compose up --build --no-cache
```

## 📁 Estructura de Servicios

```
┌─────────────────────────────────────────────────┐
│           Docker Compose Network                │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │   Frontend   │  │  API Backend │            │
│  │   (React)    │  │   (.NET 7)   │            │
│  │  Port: 3000  │  │  Port: 5000  │            │
│  └──────────────┘  └──────────────┘            │
│         │                   │                   │
│         │     HTTP/CORS     │                   │
│         └───────────────────┘                   │
│                   │                             │
│                   ▼                             │
│         ┌──────────────────┐                   │
│         │  MySQL Database  │                   │
│         │   (MySQL 8.0)    │                   │
│         │  Port: 3307:3306 │                   │
│         └──────────────────┘                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

## 🔧 Variables de Entorno

Las variables de entorno se encuentran en `docker-compose.yml`:

### Base de Datos (db)
```
MYSQL_ROOT_PASSWORD: rootpassword
MYSQL_DATABASE: VintageDB
MYSQL_USER: user
MYSQL_PASSWORD: password
```

### API Backend (api)
```
ConnectionStrings__connection=Server=db;Port=3306;Database=VintageDB;User=user;Password=password;
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:80
```

### Frontend (web)
- Comunica con la API mediante proxy en Nginx a `/api`

## 🐛 Solución de Problemas

### Error: "Port 3000 is already in use"
```bash
# Cambiar el puerto en docker-compose.yml de 3000 a otro puerto (ej: 3001)
# Luego:
docker-compose down
docker-compose up --build
```

### Error: "Cannot connect to Docker daemon"
- Asegúrate que Docker Desktop está corriendo
- En Linux, verifica: `sudo systemctl start docker`

### La base de datos no se inicializa
```bash
# Eliminar volúmenes y reintentar
docker-compose down -v
docker-compose up --build
```

### API muestra errores de conexión a BD
```bash
# Revisar logs
docker-compose logs api

# Reiniciar la BD primero
docker-compose restart db
docker-compose restart api
```

## 📝 Notas Importantes

- ✅ Los datos de prueba se cargan automáticamente en cada inicio
- ✅ La BD persiste en `mysql_data` volume (no se elimina al hacer `down`)
- ✅ El Frontend se compila en Docker (build en Node 18, servido por Nginx)
- ✅ La API se compila en Docker (.NET SDK 7.0 → runtime 7.0)
- ✅ Todos los servicios están conectados automáticamente por la red de Docker

## 🔐 Seguridad (Desarrollo)

⚠️ **IMPORTANTE**: Las credenciales y configuración actual son solo para DESARROLLO local. Para producción:
- Cambiar todas las contraseñas
- Usar variables de entorno seguros
- No exponer puertos públicamente
- Configurar HTTPS/SSL
- Usar secrets manager

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs: `docker-compose logs`
2. Asegúrate que Docker está actualizado
3. Intenta: `docker-compose down -v && docker-compose up --build`
