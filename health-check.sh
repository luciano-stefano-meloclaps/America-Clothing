#!/bin/bash

# Health Check Script para Ecommerce Vintage

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔍 Verificando salud del proyecto Ecommerce Vintage...${NC}"
echo ""

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker instalado${NC}"

# Verificar que los contenedores existen
echo ""
echo -e "${YELLOW}📊 Estado de contenedores:${NC}"

# DB Health
if docker ps | grep -q vintage_db; then
    echo -e "${GREEN}✓ Base de datos (MySQL)${NC} - ACTIVA"
else
    echo -e "${RED}✗ Base de datos (MySQL)${NC} - INACTIVA"
fi

# API Health
if docker ps | grep -q vintage_api; then
    echo -e "${GREEN}✓ API Backend (.NET)${NC} - ACTIVA"
else
    echo -e "${RED}✗ API Backend (.NET)${NC} - INACTIVA"
fi

# Web Health
if docker ps | grep -q vintage_web; then
    echo -e "${GREEN}✓ Frontend (React)${NC} - ACTIVA"
else
    echo -e "${RED}✗ Frontend (React)${NC} - INACTIVA"
fi

echo ""
echo -e "${YELLOW}🌐 Verificando conectividad:${NC}"

# Check Frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend${NC} - http://localhost:3000"
else
    echo -e "${YELLOW}⚠ Frontend${NC} - No responde (puede estar iniciando)"
fi

# Check API
if curl -s http://localhost:5000/swagger/index.html > /dev/null 2>&1; then
    echo -e "${GREEN}✓ API${NC} - http://localhost:5000"
else
    echo -e "${YELLOW}⚠ API${NC} - No responde (puede estar iniciando)"
fi

# Check DB
if docker exec vintage_db mysql -u user -ppassword -e "SELECT 1" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Base de Datos${NC} - Conectada"
else
    echo -e "${YELLOW}⚠ Base de Datos${NC} - Verificando..."
fi

echo ""
echo -e "${GREEN}✅ Verificación completada${NC}"
echo ""
echo "Acceso:"
echo "  - Frontend: http://localhost:3000"
echo "  - API: http://localhost:5000"
echo "  - Swagger: http://localhost:5000/swagger"
