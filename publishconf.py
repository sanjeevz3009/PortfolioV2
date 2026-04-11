"""Pelican configuration — production."""

from __future__ import annotations

import os
import sys
from pathlib import Path

from pelicanconf import *

# Ensure project root is on sys.path when Pelican runs from another cwd.
PROJECT_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(PROJECT_ROOT))

# Set via environment variable — Netlify: Site settings → Environment variables
# Local production test: export SITEURL=https://yourdomain.com
try:
    SITEURL = os.environ["SITEURL"]
except KeyError:
    raise RuntimeError(
        "SITEURL environment variable must be set for production builds.\n"
        "Example: export SITEURL=https://yourname.com"
    ) from None

RELATIVE_URLS = False

# Feeds — enabled in production
FEED_ALL_ATOM = "feeds/all.atom.xml"

# Cache — enable in production for faster builds
LOAD_CONTENT_CACHE = True
CACHE_CONTENT = True

# Delete output before rebuild (clean deploys)
DELETE_OUTPUT_DIRECTORY = True
