.DEFAULT_GOAL := help
PELICAN        := uv run pelican
PELICANOPTS    :=

BASEDIR        := $(CURDIR)
INPUTDIR       := $(BASEDIR)/content
OUTPUTDIR      := $(BASEDIR)/output
CONFFILE       := $(BASEDIR)/pelicanconf.py
PUBLISHCONF    := $(BASEDIR)/publishconf.py

.PHONY: help install install-dev build serve devserver clean lint format templates templates-fix security pre-commit publish check

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Setup
install: ## Install production dependencies
	uv sync

install-dev: ## Install all dependencies including dev tools
	uv sync --group dev
	uv run pre-commit install --hook-type pre-commit
	uv run pre-commit install --hook-type commit-msg

# Build
build: ## Build the site (dev config)
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

publish: ## Build the site (production config)
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(PUBLISHCONF) $(PELICANOPTS)

clean: ## Remove generated output
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)
	[ ! -d cache ] || rm -rf cache

# Dev server
serve: build ## Serve built output on localhost:8000
	$(PELICAN) --listen -r $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE)

devserver: ## Auto-rebuild and serve with live reload
	$(PELICAN) -r -l $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

# Quality
lint: ## Run ruff linter
	uv run ruff check .

format: ## Run ruff formatter
	uv run ruff format .

templates: ## Lint Jinja2 templates
	uv run djlint theme/templates/ --profile=jinja

templates-fix: ## Lint + reformat Jinja2 templates
	uv run djlint theme/templates/ --profile=jinja --reformat

security: ## Run gitleaks secret scan
	gitleaks detect --source . --verbose

pre-commit: ## Run all pre-commit hooks against all files
	uv run pre-commit run --all-files

check: lint templates ## Run all checks (no format changes)
