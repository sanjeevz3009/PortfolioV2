"""Pelican configuration — production."""

from __future__ import annotations

import os
import sys
from pathlib import Path

# Ensure project root is on sys.path when Pelican runs from another cwd.
PROJECT_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(PROJECT_ROOT))

from pelicanconf import *  # noqa: E402,F403

# URLs
SITEURL = os.environ["SITEURL"]
RELATIVE_URLS = False

# Feeds — enabled in production
FEED_ALL_ATOM = "feeds/all.atom.xml"
FEED_ALL_RSS = "feeds/all.rss.xml"

# Cache — enable in production for faster builds
LOAD_CONTENT_CACHE = True
CACHE_CONTENT = True

# Delete output before rebuild (clean deploys)
DELETE_OUTPUT_DIRECTORY = True
