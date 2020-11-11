from flask import Flask, render_template, request, abort, Response, redirect
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.DEBUG)
import requests
import curlify

app = Flask('app')
CORS(app)

@app.route('/p/<path:url>')
def proxy(url):
    print(request.args)
    url += '?'
    if 'prochainADiscuter' not in url:
        for arg in request.args:
            for val in request.args.getlist(arg):
                url += '&' + arg + '=' + val
    cookies = {
        'FOSUSED_BIBARD': request.args.get('bibard', ''),
        'FOSUSED_BIBARD_SUFFIXE': request.args.get('bibardSuffixe', ''),
        'FOSUSED_ORGANE': request.args.get('organeAbrv', ''),
    }
    r = requests.get(url, cookies=cookies)
    print(curlify.to_curl(r.request))
    return r.text, r.status_code

app.run(debug=True)