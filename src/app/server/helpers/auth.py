from flask_security import current_user
from flask import url_for, redirect, request


def user_required(f):
    """Checks whether user is logged in or raises error 401."""

    def decorator(*args, **kwargs):
        if not current_user.is_authenticated:
            return redirect(url_for('security.login', next=request.url))
        return f(*args, **kwargs)

    return decorator
