"""Pelican configuration — local development."""

from __future__ import annotations

from datetime import datetime

AUTHOR = "Sanjeev Srithevan"
SITENAME = "Sanjeev Srithevan"
SITEURL = ""

PATH = "content"
THEME = "theme"

TIMEZONE = "Europe/London"
DEFAULT_LANG = "en"

# Content paths
ARTICLE_PATHS = ["blog"]
ARTICLE_URL = "blog/{slug}/"
ARTICLE_SAVE_AS = "blog/{slug}/index.html"

# Blog index lives at /blog/
DIRECT_TEMPLATES = ["blog"]
BLOG_URL = "blog/"
BLOG_SAVE_AS = "blog/index.html"

# Disable Pelican's default index — homepage is handled by TEMPLATE_PAGES
INDEX_SAVE_AS = ""

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
STATIC_PATHS = ["images", "robots.txt"]

EXTRA_PATH_METADATA = {
    "images/favicons/favicon.ico": {"path": "favicon.ico"},
    "images/favicons/favicon-16x16.png": {"path": "favicon-16x16.png"},
    "images/favicons/favicon-32x32.png": {"path": "favicon-32x32.png"},
    "images/favicons/apple-touch-icon.png": {"path": "apple-touch-icon.png"},
    "images/favicons/android-chrome-192x192.png": {
        "path": "android-chrome-192x192.png"
    },
    "images/favicons/android-chrome-512x512.png": {
        "path": "android-chrome-512x512.png"
    },
    "images/favicons/site.webmanifest": {"path": "site.webmanifest"},
    "images/sanjeev-srithevan-cv.pdf": {"path": "sanjeev-srithevan-cv.pdf"},
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
        "indexes": 0.9,  # homepage is an index — give it highest priority
        "pages": 0.6,
    },
    "changefreqs": {
        "articles": "monthly",
        "indexes": "weekly",
        "pages": "monthly",
    },
}

# Typography
TYPOGRIFY = True

# Don't mess with typography in these tags
TYPOGRIFY_IGNORE_TAGS = ["pre", "code", "kbd", "math"]

# Pagination — off, keep it simple
DEFAULT_PAGINATION = False

# Caching — off in dev so changes always rebuild
LOAD_CONTENT_CACHE = False

PAGINATED_TEMPLATES = {"blog": None}

CURRENT_YEAR = datetime.now().year
