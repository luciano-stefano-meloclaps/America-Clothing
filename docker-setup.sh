#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     🐳 Ecommerce Vintage - Docker Setup Helper             ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no está instalado. Por favor instala Docker Desktop.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose no está instalado.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker está instalado${NC}"
echo ""

# Menu de opciones
echo "Selecciona una opción:"
echo "1. Iniciar proyecto (build + up)"
echo "2. Parar proyecto"
echo "3. Ver logs"
echo "4. Reiniciar servicios"
echo "5. Limpiar todo (down -v)"
echo "6. Ver estado de contenedores"
echo ""
read -p "Opción [1-6]: " option

case $option in
    1)
        echo -e "${YELLOW}🚀 Iniciando proyecto...${NC}"
        docker-compose up --build
        ;;
    2)
        echo -e "${YELLOW}⏹️  Parando proyecto...${NC}"
        docker-compose down
        echo -e "${GREEN}✓ Proyecto parado${NC}"
        ;;
    3)
        echo -e "${YELLOW}📋 Mostrando logs...${NC}"
        docker-compose logs -f
        ;;
    4)
        echo -e "${YELLOW}🔄 Reiniciando servicios...${NC}"
        docker-compose restart
        echo -e "${GREEN}✓ Servicios reiniciados${NC}"
        ;;
    5)
        echo -e "${RED}⚠️  Eliminando todos los contenedores y volúmenes...${NC}"
        docker-compose down -v
        echo -e "${GREEN}✓ Limpieza completada${NC}"
        ;;
    6)
        echo -e "${YELLOW}📊 Estado de contenedores:${NC}"
        docker-compose ps
        ;;
    *)
        echo -e "${RED}❌ Opción inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✓ Hecho!${NC}"
