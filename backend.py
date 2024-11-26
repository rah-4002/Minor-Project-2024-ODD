from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Allow all origins

@app.route('/get_gesture', methods=['GET'])
def get_gesture():
    try:
        with open("gesture_result.json", 'r') as f:
            data = json.load(f)
        return jsonify(data), 200
    except FileNotFoundError:
        return jsonify({"gesture": "No gesture detected yet"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
