from flask import Flask, render_template, redirect
from deta import Deta
import markdown

import os

app = Flask(__name__)
deta = Deta(os.environ['DETA_PROJECT_KEY'])
settings_data = deta.Base('settings')


@app.route('/', methods=["GET"])
def homepage():
    settings = settings_data.fetch().items
    if settings:
        return render_template("dashboard.html", settings=settings)
    else:
        return redirect("/welcome")

@app.route('/welcome', methods=["GET"])
def welcome_setup():
    data = settings_data.fetch().items
    if data:
        return redirect("/")
    else:
        return render_template("welcome.html") 

@app.route('/expense', methods=["GET"])
def expense():
    settings = settings_data.fetch().items
    if settings:
        return render_template("expense.html", settings=settings)
    else:
        return redirect("/welcome")

@app.route('/income', methods=["GET"])
def income():
    settings = settings_data.fetch().items
    if settings:
        return render_template("income.html", settings=settings)
    else:
        return redirect("/welcome")

@app.route('/savings', methods=["GET"])
def savings():
    settings = settings_data.fetch().items
    if settings:
        return render_template("savings.html", settings=settings)
    else:
        return redirect("/welcome")

@app.route('/docs', methods=["GET"])
def docs():
    return render_template("docs.html")

@app.route('/docs/<url>', methods=["GET"])
def docspages(url):
    page = open('templates/docs/' + url + ".md","r")
    template = markdown.markdown(page.read())
    return render_template('docs/display.html', template=template)

@app.route('/settings', methods=["GET"])
def settings():
    data = settings_data.fetch().items
    if data:
        return render_template("settings.html", items=data)
    else:
        return redirect("/welcome")