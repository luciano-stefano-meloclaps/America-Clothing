@echo off
setlocal enabledelayedexpansion

REM Colores (Windows 10+)
cls

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     Docker Ecommerce Vintage - Windows Helper              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker no está instalado. Por favor instala Docker Desktop.
    exit /b 1
)

echo ✓ Docker está instalado
echo.

echo Selecciona una opción:
echo 1. Iniciar proyecto (build + up)
echo 2. Parar proyecto
echo 3. Ver logs
echo 4. Reiniciar servicios
echo 5. Limpiar todo (down -v)
echo 6. Ver estado de contenedores
echo.

set /p option="Opción [1-6]: "

if "%option%"=="1" (
    echo.
    echo 🚀 Iniciando proyecto...
    docker-compose up --build
) else if "%option%"=="2" (
    echo.
    echo ⏹ Parando proyecto...
    docker-compose down
    echo ✓ Proyecto parado
) else if "%option%"=="3" (
    echo.
    echo 📋 Mostrando logs...
    docker-compose logs -f
) else if "%option%"=="4" (
    echo.
    echo 🔄 Reiniciando servicios...
    docker-compose restart
    echo ✓ Servicios reiniciados
) else if "%option%"=="5" (
    echo.
    echo ⚠️ Eliminando todos los contenedores y volúmenes...
    docker-compose down -v
    echo ✓ Limpieza completada
) else if "%option%"=="6" (
    echo.
    echo 📊 Estado de contenedores:
    docker-compose ps
) else (
    echo ❌ Opción inválida
    exit /b 1
)

echo.
echo ✓ Hecho!
echo.
pause
