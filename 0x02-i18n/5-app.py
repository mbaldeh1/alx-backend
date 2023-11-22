#!/usr/bin/env python3
"""
Basic flask app for demonstrating
i18n and l10n
"""
from flask import Flask, render_template, request, g
from flask_babel import _, Babel
from typing import Any, Mapping, Optional
app = Flask(__name__)
babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """
    class to configure available languages in the app
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
@app.route("/")
@app.route("/<string:locale>")
@app.route("/<int:login_as>")
def hello() -> str:
    """
    root route that just renders a template
    """
    if g.user:
        return render_template('5-index.html', user=g.user)
    return render_template('5-index.html')


@babel.localeselector
def get_locale() -> Optional[str]:
    """
    Determines the best match for this app's supported
    languages
    """
    translation_lang = request.args.get('locale')
    if translation_lang in app.config["LANGUAGES"]:
        return translation_lang
    return request.accept_languages.best_match(app.config["LANGUAGES"])


def get_user(login_as: Optional[str] = None) -> Optional[object]:
    """
    Returns a user-like dictionary if user_id(login_as)
    is present, returns None otherwise
    """
    if login_as:
        try:
            user = users.get(int(login_as))
            return user
        except Exception as e:
            pass
    return None


@app.before_request
def before_request() -> None:
    """
    Executed before all other functions to find a user if any
    """
    login_as = request.args.get('login_as')
    user = get_user(login_as)
    g.user = user
