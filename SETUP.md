# 🛍️ Ecommerce Vintage - Proyecto Completo

Una plataforma de e-commerce para tiendas vintage con backend en .NET 7 y frontend en React.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación Rápida](#instalación-rápida)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Documentación](#documentación)

## ✨ Características

- 🔐 Autenticación JWT
- 👥 Gestión de usuarios (Admin, Empleados, Clientes)
- 📦 Catálogo de productos con imágenes en Cloudinary
- 🛒 Sistema de órdenes de venta
- 📊 Panel de administración
- 🎨 Interfaz responsive con React
- 🐳 Totalmente dockerizado

## 🔧 Requisitos

- **Docker Desktop** (incluye Docker + Docker Compose)
- **Windows 10+**, **macOS**, o **Linux**
- **2GB RAM mínimo** para los contenedores

[Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)

## 🚀 Instalación Rápida

### Opción 1: Con GUI Helper (Recomendado para Windows)

```bash
# En Windows, haz doble clic en:
docker-setup.bat
```

Selecciona la opción 1: "Iniciar proyecto"

### Opción 2: Terminal/Bash (Linux/macOS)

```bash
# En Linux/macOS
chmod +x docker-setup.sh
./docker-setup.sh
```

### Opción 3: Comandos Docker Directos

```bash
# Clonar el proyecto
git clone <tu-repositorio>
cd ecommerce-vintage

# Iniciar todo con Docker Compose
docker-compose up --build

# En otra terminal (opcional) para ver logs
docker-compose logs -f
```

### Acceso a la Aplicación

Una vez que los servicios estén listos, abre:

| Componente | URL |
|-----------|-----|
| **App Frontend** | http://localhost:3000 |
| **API Backend** | http://localhost:5000 |
| **Swagger Docs** | http://localhost:5000/swagger |

### Credenciales de Prueba

```
Usuario: luciano.admin
Contraseña: admin123

O cualquier usuario en: ./DataBase/_seed_data.sql
```

## 📁 Estructura del Proyecto

```
ecommerce-vintage/
├── Backend/                    # API .NET 7
│   ├── WebVintage/            # Proyecto principal
│   ├── Application/           # Servicios y DTOs
│   ├── Domain/                # Entidades y excepciones
│   ├── Infrastructure/        # Acceso a datos, contexto BD
│   └── Dockerfile
│
├── Frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── pages/             # Páginas
│   │   ├── context/           # Context API
│   │   ├── services/          # Llamadas API
│   │   └── assets/            # Imágenes, estilos
│   ├── nginx.conf
│   └── Dockerfile
│
├── DataBase/                   # Scripts SQL
│   ├── vintage_db.sql         # Schema
│   └── _seed_data.sql         # Datos de prueba
│
├── docker-compose.yml         # Orquestación de servicios
├── .env.example               # Variables de ejemplo
├── DOCKER_SETUP.md            # Documentación Docker
└── README.md                  # Este archivo
```

## 🛠️ Tecnologías

### Backend
- **Framework:** .NET 7 (C#)
- **Base de Datos:** MySQL 8.0
- **Autenticación:** JWT
- **ORM:** Entity Framework Core
- **API Docs:** Swagger
- **Imágenes:** Cloudinary

### Frontend
- **Librería:** React 18
- **Build Tool:** Vite
- **Estilos:** Bootstrap 5
- **HTTP Client:** Axios
- **Servidor:** Nginx (producción)

### DevOps
- **Containerización:** Docker
- **Orquestación:** Docker Compose
- **Node:** 18-Alpine
- **Base de datos:** MySQL 8.0

## 📚 Documentación Detallada

- [DOCKER_SETUP.md](./DOCKER_SETUP.md) - Guía completa de Docker
- [READMEFrontend.md](./Frontend/READMEFrontend.md) - Documentación del Frontend
- [READMEDataBase.md](./DataBase/READMEDataBase.md) - Estructura de BD

## 🔄 Flujo de Trabajo

### Desarrollo Local

1. **Iniciar proyecto:**
   ```bash
   docker-compose up --build
   ```

2. **Ver logs en tiempo real:**
   ```bash
   docker-compose logs -f
   ```

3. **Detener servicios:**
   ```bash
   docker-compose down
   ```

### Editar Código

- **Backend:** Cambios en `Backend/` → Requiere rebuild: `docker-compose up --build`
- **Frontend:** Cambios en `Frontend/src/` → Requiere rebuild: `docker-compose up --build`

## 🧪 Testing

### API Swagger
```
http://localhost:5000/swagger
```

### Prueba de Autenticación
```bash
# Login
curl -X POST http://localhost:5000/api/authenticate/login \
  -H "Content-Type: application/json" \
  -d '{"username":"luciano.admin","password":"admin123"}'

# Usar token en requests
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer <token>"
```

## 🔐 Variables de Entorno

Consulta `.env.example` para todas las variables. Las principales:

```
MYSQL_DATABASE=VintageDB
MYSQL_USER=user
MYSQL_PASSWORD=password
ASPNETCORE_ENVIRONMENT=Development
```

## 🐛 Solución de Problemas

### Puertos ocupados
```bash
# Cambiar puerto en docker-compose.yml y reiniciar
docker-compose down
docker-compose up --build
```

### Base de datos no inicializa
```bash
# Limpiar volúmenes y reintentar
docker-compose down -v
docker-compose up --build
```

### Ver errores específicos
```bash
docker-compose logs api    # Logs de la API
docker-compose logs web    # Logs del Frontend
docker-compose logs db     # Logs de la BD
```

## 📞 Contribuciones

Para contribuir al proyecto:
1. Crea una rama: `git checkout -b feature/TuFeature`
2. Realiza cambios y commit: `git commit -am 'Agrega TuFeature'`
3. Push: `git push origin feature/TuFeature`
4. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia [Especificar Licencia]

## 👥 Autores

- **Camilo Carabajal** - Desarrollo

---

**Última actualización:** Abril 2026

💡 **Tip:** Para desarrollo más rápido sin Docker, consulta la documentación específica del Backend y Frontend.
