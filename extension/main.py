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

# import string

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


# materials = "Cashmere, 100% polyester 50%"
# details = "Product Dimensions : 12.5 x 11.5 x 0.25 inches; 4.16 Ounces\nItem model number : CA-H20-UXS-PLAID\nDepartment : Unisex-adult\nDate First Available : December 7, 2020\nASIN : B08PYM3Y5V"

def remove_punc(text):
    text.strip()
    text = [char for char in text if char not in string.punctuation]
    text = ''.join(text).lower()
    return text

def materialToPercentage(materials):
    materials = remove_punc(materials)
    materialsList = materials.split(" ")
    materialToPercentage = {}
    print()
    for i in range(0, len(materialsList),2):
        perc = int(materialsList[i + 1])/100
        materialToPercentage[materialsList[i]] = perc
    return materialToPercentage


def test_firestore(request):
    print("this is the request ")
    print(request)
    r = request.get_json(silent=True)

    # print("printing everything")
    # print(request.data)
    # print(request.values)
    # print(request.args)
    # print(request.form)
    # print(request.files)

    print("this is what we get from the webpage")
    print(r)

    # if(r is not None):
    print("this is the type")
    print(type(r))

    print("the read article thing returns this")
    idk = read_article(r)
    print(idk)
    print(type(idk))
        # idk = r.string()

    aaaa = idk.split(" ")
    print(aaaa)

    product_material = ""
    if(len(aaaa)>1):
        product_material = aaaa[1].lower()
        print(product_material)

    print("here now")
        
    if(len(product_material)>0):
        str_length = len(product_material)
        print(str_length)
        product_material = product_material[0:str_length-1]
        print(product_material)


    # res = None

    print("----checkpoint passed")
    print("product_material is ")
    print(product_material)
    print("----")

    print(type(product_material))

    # if(len(product_material)>0):

    print("this is what im trying")

    names_list = ["polyester", "nylon", "pashmina", "cotton"]

    # doc_ref = None
    # # temp = None
    temp = ""
    for material in names_list:
        if(product_material==material):
            temp = material
            break

    # if(doc_ref is None):
    #     return {}
    # temp = "polyester"
    if(temp==""):
        print("this should not happen")
        temp = "nylon"

    doc_ref = db.collection('Textiles').document(temp)
    doc = doc_ref.get()

    res = None      
    if doc.exists:
        res = jsonify(doc.to_dict())
        dbfields = doc.to_dict()
        print(dbfields['CarbonEmission'])
            # c_emission = dbfields['CarbonEmission']*weight*percent

        print("done i think")
        res.headers.set('Access-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST');
        res.headers.set('Access-Control-Allow-Headers', '*');
    else:
        res = {}

    return res

    # return {}
    

def generate_summary(request):
    
    request_json = request.get_json(silent=True)
    sentences =  read_article(request_json)

    users_ref = db.collection(u'Textiles')
    docs = users_ref.stream()

    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
  

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

