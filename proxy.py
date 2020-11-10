from flask import Flask, render_template, request, abort, Response, redirect
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.DEBUG)
import requests

app = Flask('app')
CORS(app)

@app.route('/p/<path:url>')
def proxy(url):
    print(request.args)
    url += '?'
    for arg in request.args:
        for val in request.args.getlist(arg):
            url += '&' + arg + '=' + val
    print(url)            
    r = requests.get(url)
    return r.text

app.run(debug=True)