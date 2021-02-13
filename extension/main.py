# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the 'License');
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an 'AS IS' BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import sys

# [START functions_helloworld_http]
# [START functions_http_content]
from flask import escape
from flask import jsonify, abort

# [END functions_helloworld_http]
# [END functions_http_content]

print("does this work?")

from gensim.summarization import summarize
import requests
import json

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
  'projectId': "test1-304600",
})

db = firestore.client()


def read_article(file_json):
    article = ''
    filedata = json.dumps(file_json)
    if len(filedata) < 100000:
        article = filedata
    return article


def test_firestore(request):

    r = request.get_json(silent=True)
    # print(r)

    doc_ref = db.collection('Textiles').document('polyester')

    doc = doc_ref.get()
    res = None
    if doc.exists:
        res = jsonify(doc.to_dict())
        res.headers.set('Access-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST');
        res.headers.set('Access-Control-Allow-Headers', '*');
    else:
        res = {}

    return res
    

def generate_summary(request):
    
    request_json = request.get_json(silent=True)
    sentences =  read_article(request_json)

<<<<<<< HEAD
    users_ref = db.collection(u'Textiles')
    docs = users_ref.stream()

    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
  

=======

    ###
    
>>>>>>> the right text fields
    summary = summarize(sentences, ratio=0.3)
    summary_list = summary.split('.')
    for i, v in enumerate(summary_list):
        summary_list[i] = v.strip() + '.'
    summary_list.remove('.')

    return json.dumps(summary_list)
    # return json.dumps(sentences)


# [START functions_helloworld_get]
def hello_get(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    Note:
        For more information on how Flask integrates with Cloud
        Functions, see the `Writing HTTP functions` page.
        <https://cloud.google.com/functions/docs/writing/http#http_frameworks>
    """
    return 'Hello World!'
# [END functions_helloworld_get]

