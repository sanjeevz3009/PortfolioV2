.PHONY: help venv sync lint fmt db up down logs shell migrate superuser run tw

help:
	@echo "Targets:"
	@echo "  sync         Install deps from uv.lock"
	@echo "  lint         Ruff lint"
	@echo "  fmt          Ruff format"
	@echo "  db           Start postgres only"
	@echo "  up           Start full stack (web + db)"
	@echo "  down         Stop containers"
	@echo "  logs         Tail containers"
	@echo "  migrate      Run migrations"
	@echo "  superuser    Create superuser"
	@echo "  run          Run Django locally (host mode)"
	@echo "  tw           Run Tailwind watcher (host mode)"

sync:
	uv sync --frozen

lint:
	uv run ruff check .

fmt:
	uv run ruff format .

db:
	docker compose up -d db

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

shell:
	uv run python manage.py shell

migrate:
	uv run python manage.py migrate

superuser:
	uv run python manage.py createsuperuser

run:
	uv run python manage.py runserver

tw:
	npm run tw:dev
