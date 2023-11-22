#!/usr/bin/env python3
"""
basic flask app for demonstrating
i18n
"""
from flask import Flask, render_template
from flask_babel import Babel

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
def hello() -> str:
    """
    root route that just renders a template
    """
    return render_template('1-index.html')
