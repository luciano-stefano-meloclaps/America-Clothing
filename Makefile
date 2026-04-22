.PHONY: help up down logs restart clean health

help:
	@echo "🐳 Ecommerce Vintage - Docker Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make up              - Start all services"
	@echo "  make down            - Stop all services"
	@echo "  make logs            - View logs (all services)"
	@echo "  make restart         - Restart all services"
	@echo "  make clean           - Remove all containers and volumes"
	@echo "  make health          - Check health of services"
	@echo "  make api-logs        - View API logs only"
	@echo "  make db-logs         - View Database logs only"
	@echo "  make web-logs        - View Frontend logs only"
	@echo ""

up:
	docker-compose up --build

down:
	docker-compose down

logs:
	docker-compose logs -f

restart:
	docker-compose restart

clean:
	docker-compose down -v

health:
	docker-compose ps

api-logs:
	docker-compose logs -f api

db-logs:
	docker-compose logs -f db

web-logs:
	docker-compose logs -f web
