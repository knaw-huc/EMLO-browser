from flask import Flask, request, jsonify
from elastic_index import Index
from mysql_handler import Db
import os


# config = {
#     "url" : "sport-elastic",
#     "port" : "9200",
#     "doc_type" : "sport"
# }

app = Flask(__name__)

config = {
    "url" : os.getenv("ES_URI", "http://localhost"),
    "port" : os.getenv("ES_PORT ", "9200"),
    "doc_type" : "sport"
}

db_config = {
    "host": os.environ.get("DB_HOST", "localhost"),
    "database": os.environ.get("DB_DATABASE", "emlo"),
    "user": os.environ.get("DB_USER", "root"),
    "password": os.environ.get("DB_PASSWORD", "bonzo")
}

index = Index(config)
db = Db(db_config)

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    return response

@app.route('/detail/<id>')
def detail(id):
    return app.send_static_file("index.html")

@app.route("/location_facet", methods=['POST', 'GET'])
def get_location_facet():
    struc = request.get_json()
    ret_struc = index.get_facet(struc["name"], struc["amount"], struc["filter"], struc["searchvalues"], "emlo-location")
    return jsonify(ret_struc)

@app.route("/person_facet", methods=['POST', 'GET'])
def get_person_facet():
    struc = request.get_json()
    ret_struc = index.get_facet(struc["name"], struc["amount"], struc["filter"], struc["searchvalues"], "emlo-person")
    return jsonify(ret_struc)

@app.route("/letter_facet", methods=['POST', 'GET'])
def get_letter_facet():
    struc = request.get_json()
    ret_struc = index.get_facet(struc["name"], struc["amount"], struc["filter"], struc["searchvalues"], "emlo-letter")
    return jsonify(ret_struc)

@app.route("/browse_location",  methods=['POST', 'GET'])
def browse_locations():
    struc = request.get_json()
    ret_struc = index.browse_locations(struc["page"], struc["page_length"], struc["searchvalues"])
    return jsonify(ret_struc)

@app.route("/browse_person",  methods=['POST', 'GET'])
def browse_persons():
    struc = request.get_json()
    ret_struc = index.browse_persons(struc["page"], struc["page_length"], struc["searchvalues"])
    return jsonify(ret_struc)

@app.route("/browse_letter",  methods=['POST', 'GET'])
def browse_letters():
    struc = request.get_json()
    ret_struc = index.browse_letters(struc["page"], struc["page_length"], struc["searchvalues"])
    return jsonify(ret_struc)

@app.route("/location_detail/<id>", methods=['GET'])
def location_detail(id):
    ret_struc = db.get_location_details(id)
    return jsonify(ret_struc)

@app.route("/person_detail/<id>", methods=['GET'])
def person_detail(id):
    ret_struc = db.get_person_details(id)
    return jsonify(ret_struc)


@app.route("/letter_detail/<id>", methods=['GET'])
def letter_detail(id):
    ret_struc = db.get_letter_details(id)
    return jsonify(ret_struc)
#Start main program

if __name__ == '__main__':
    app.run()

