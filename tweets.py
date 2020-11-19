import logging
import shlex
import json
import os
import tempfile

logging.basicConfig(level=logging.DEBUG)

from flask import Flask, render_template, request, abort, Response, redirect
from flask_cors import CORS

app = Flask('app')
CORS(app)

@app.route('/tweets/<path:url>')
def proxy(url):
    f = tempfile.NamedTemporaryFile()
    cmd = "twint -s " + shlex.quote(url) + " -o " + f.name + " --json --limit 100"
    print(cmd)
    os.system(cmd)
    tweets = []
    for line in open(f.name):
        tweets.append(json.loads(line))
    return app.response_class(
        response=json.dumps(len(tweets)),
        status=200,
        mimetype='application/json'
    )

app.run(debug=True, host="0.0.0.0", port=8011)
