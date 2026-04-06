Title: Hello, World
Date: 2026-04-06
Slug: hello-world
Category: General
Summary: First post on my new portfolio — a quick note on how it was built and what's coming.
<!-- cover_image: /theme/images/hello-world-cover.jpg -->

This is the first post on my new portfolio site. Built with [Pelican](https://getpelican.com), a Python static site generator, and deployed to [Netlify](https://netlify.com).

## Why a static site?

I spend my days working in Django and Wagtail. For a personal portfolio that stack would be overkill - a database, a server, a deployment pipeline, all for a handful of pages and some blog posts.

A static site gives me:

- **Zero infrastructure** - no server to patch, no database to back up
- **Free hosting** - Netlify's free tier is more than enough
- **Fast deploys** - `git push` and the site is live in ~30 seconds
- **Full control** - plain HTML, CSS and Markdown, no magic

## The stack

Here's the full picture:

| Concern | Tool |
|---|---|
| Language | Python 3.14 |
| Package management | uv |
| Static site generator | Pelican |
| Templates | Jinja2 |
| Styling | Tailwind CSS |
| Deployment | Netlify |

## A code example

The Pelican config is just a Python file:

```python
AUTHOR = "Sanjeev Srithevan"
SITENAME = "Sanjeev Srithevan"
TIMEZONE = "Europe/London"
PLUGINS = ["pelican.plugins.sitemap"]
```

Security headers, caching, and redirects are all handled in `netlify.toml` - no server config needed.

## Blockquote example

> The best tool is the one that solves the problem without creating new ones.

## What's next

More writing. I'll be posting about Python, Django, Wagtail, and whatever else I'm working on.

If you want to follow along, there's an [Atom feed](/feeds/all.atom.xml) - no newsletter, no tracking, just RSS.
