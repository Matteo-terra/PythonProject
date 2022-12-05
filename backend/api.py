from flask import Flask, jsonify, request
from flask_cors import CORS
 
app = Flask(__name__)
CORS(app)


@app.route("/send",methods =['POST'])
def hello_world():
    
    ws = request.args.get("ws")
    Ta = request.args.get("Ta")
    intensite=request.args.get("intensite")
    T0 = request.args.get("T0")
    temps=request.args.get("temps")
    
    
    return f"Ok"

