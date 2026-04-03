"""Pelican configuration — local development."""

from __future__ import annotations

AUTHOR = "Sanjeev Srithevan"
SITENAME = "Sanjeev Srithevan"
SITEURL = ""

PATH = "content"
THEME = "theme"

TIMEZONE = "Europe/London"
DEFAULT_LANG = "en"

# Jinja2
JINJA_ENVIRONMENT: dict = {
    "extensions": [
        "jinja2.ext.do",
        "jinja2.ext.loopcontrols",
    ]
}

# Content paths
ARTICLE_PATHS = ["blog"]
ARTICLE_URL = "blog/{slug}/"
ARTICLE_SAVE_AS = "blog/{slug}/index.html"

# Blog index lives at /blog/
INDEX_SAVE_AS = "blog/index.html"

# One-pager is the real homepage — served from a custom template page
TEMPLATE_PAGES = {"index.html": "index.html"}

# Disable unused author/category/tag/archive pages
AUTHOR_SAVE_AS = ""
CATEGORY_SAVE_AS = ""
TAG_SAVE_AS = ""
ARCHIVES_SAVE_AS = ""
AUTHORS_SAVE_AS = ""
CATEGORIES_SAVE_AS = ""
TAGS_SAVE_AS = ""

# Feeds — off locally
FEED_ALL_ATOM = None
FEED_ALL_RSS = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Static assets
STATIC_PATHS = ["images"]
EXTRA_PATH_METADATA = {
    "images/favicon.ico": {"path": "favicon.ico"},
}

# Markdown extensions
MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {
            "css_class": "highlight",
            "linenums": False,
        },
        "markdown.extensions.extra": {},
        "markdown.extensions.toc": {
            "permalink": True,
        },
        "markdown.extensions.meta": {},
    },
    "output_format": "html5",
}

# Plugins
PLUGINS: list[str] = [
    "pelican.plugins.sitemap",
]

SITEMAP = {
    "format": "xml",
    "priorities": {
        "articles": 0.8,
        "pages": 0.6,
        "indexes": 0.5,
    },
    "changefreqs": {
        "articles": "monthly",
        "pages": "monthly",
        "indexes": "weekly",
    },
}

# Typography
TYPOGRIFY = True

# Pagination — off, keep it simple
DEFAULT_PAGINATION = False

# Caching — off in dev so changes always rebuild
LOAD_CONTENT_CACHE = False

DIRECT_TEMPLATES = ["index", "blog"]
PAGINATED_TEMPLATES = {"blog": None}
