# Default shell
SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c
MAKEFLAGS += --warn-undefined-variables

.PHONY: help build up down logs shell backend-shell frontend-shell test test-coverage coverage-report coverage-html coverage-html-open clean

# Show this help message
help:
	@echo "Available commands:"
	@echo "  make build             Build all Docker images"
	@echo "  make build-backend     Build backend Docker image (no cache)"
	@echo "  make up                Start all services in detached mode"
	@echo "  make down              Stop and remove all containers"
	@echo "  make logs              Tail logs from all services"
	@echo "  make shell             Open a shell in the backend container"
	@echo "  make test              Run Django tests"
	@echo "  make test-coverage     Run Django tests with coverage"
	@echo "  make coverage-report   Show coverage report in terminal"
	@echo "  make coverage-html     Generate HTML coverage report (inside container)"
	@echo "  make coverage-html-open Generate HTML report, copy to host, and open"
	@echo "  make clean             Remove coverage data and reports"

# Build all images
build:
	docker-compose build

# Rebuild backend image without cache (useful after requirements.txt changes)
build-backend:
	docker-compose build --no-cache backend

# Start services
up:
	docker-compose up -d

# Stop services
down:
	docker-compose down

# Tail logs
logs:
	docker-compose logs -f

# Open shell in backend container
shell:
	docker-compose exec backend /bin/bash

# Run Django tests
test:
	docker-compose exec backend python src/manage.py test

# Run Django tests with coverage
test-coverage:
	docker-compose exec backend coverage run src/manage.py test

# Show coverage report
coverage-report: test-coverage
	docker-compose exec backend coverage report

# Generate HTML coverage report inside container
coverage-html: test-coverage
	docker-compose exec backend coverage html

# Generate HTML report, copy it to host, and open in browser
coverage-html-open: coverage-html
	@mkdir -p ./backend/htmlcov
	@docker cp $$(docker-compose ps -q backend):/app/backend/htmlcov/. ./backend/htmlcov/
	@echo "HTML report copied to ./backend/htmlcov/"
	@xdg-open ./backend/htmlcov/index.html || open ./backend/htmlcov/index.html || echo "Open ./backend/htmlcov/index.html manually"

# Remove coverage data and HTML report
clean:
	docker-compose exec backend rm -f .coverage
	docker-compose exec backend rm -rf htmlcov

migrate:
	docker-compose exec backend python src/manage.py migrate

makemigrations:
	docker-compose exec backend python src/manage.py makemigrations

