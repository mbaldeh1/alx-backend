#!/usr/bin/env python3
"""
basic flask app for demonstrating
i18n
"""
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def hello() -> str:
    """
    root route that just renders a template
    """
    return render_template('0-index.html')
