import os

from .base import *

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DATABASE_NAME", "portfolio"),
        "USER": os.environ.get("DATABASE_USER", "portfolio"),
        "PASSWORD": os.environ.get("DATABASE_PASSWORD", "portfolio"),
        "HOST": os.environ.get("DATABASE_HOST", "127.0.0.1"),
        "PORT": os.environ.get("DATABASE_PORT", "5432"),
    }
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

try:
    from .local import *
except ImportError:
    pass
