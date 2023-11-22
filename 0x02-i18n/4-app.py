#!/usr/bin/env python3
"""
Basic flask app for demonstrating
i18n
"""
from flask import Flask, render_template, request
from flask_babel import _, Babel
from typing import Optional

app = Flask(__name__)
babel = Babel(app)


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
def hello(locale=None) -> str:
    """
    root route that just renders a template
    """
    return render_template('4-index.html')


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
