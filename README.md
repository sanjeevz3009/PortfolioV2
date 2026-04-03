# portfolio

Personal portfolio and blog. Built with [Pelican](https://getpelican.com), styled with
[Tailwind CSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com), deployed to
[Netlify](https://netlify.com).

## Stack

| Concern | Tool |
|---|---|
| Language | Python 3.14 |
| Package management | [uv](https://docs.astral.sh/uv/) |
| Static site generator | Pelican |
| Templates | Jinja2 |
| Styling | Tailwind CSS CDN + DaisyUI |
| Hosting | Netlify |
| DNS / CDN | Cloudflare |

## Prerequisites

- Python 3.14.2 (via pyenv — `.python-version` is committed)
- [uv](https://docs.astral.sh/uv/) installed

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Local development

```bash
# Install dependencies
make install-dev

# Start dev server with auto-reload at http://localhost:8000
make devserver
```

## Common commands

```bash
make help          # list all commands
make build         # one-off build (dev config)
make serve         # build + serve (no auto-reload)
make devserver     # auto-rebuild + serve
make lint          # ruff lint
make format        # ruff format
make typecheck     # mypy
make templates     # djLint template check
make check         # run all checks
make pre-commit    # run all pre-commit hooks against all files
make clean         # remove output/
make publish       # build with production config
```

## Adding a blog post

Create a Markdown file in `content/blog/`:

```markdown
Title: My Post Title
Date: 2026-04-03
Slug: my-post-title
Summary: One sentence that appears in the blog index and OG description.

Post body here...
```

Then:

```bash
git add content/blog/my-post-title.md
git commit -m "feat: add post — my post title"
git push
```

Netlify builds and deploys automatically.

## Deployment

Netlify is configured via `netlify.toml`. Connect the GitHub repo in the Netlify
dashboard and it handles everything — build, deploy, SSL.

Update `SITEURL` in `publishconf.py` once you have your domain.

## Project structure

```text
portfolio/
├── content/
│   └── blog/           # Markdown blog posts
├── theme/
│   ├── templates/      # Jinja2 templates
│   │   ├── base.html
│   │   ├── index.html  # one-pager (home, about, experience, skills, contact)
│   │   ├── blog.html   # blog index
│   │   └── article.html
│   └── static/
│       ├── css/
│       └── js/
├── .github/
│   └── workflows/ci.yml
├── .pre-commit-config.yaml
├── .python-version
├── pelicanconf.py      # dev config
├── publishconf.py      # production config
├── netlify.toml
├── Makefile
└── pyproject.toml
```
