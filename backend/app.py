from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_detector import analyze_code

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'file' in request.files:
        file = request.files['file']
        code = file.read().decode('utf-8')
    elif request.is_json:
        data = request.get_json()
        code = data.get('code', '')
    else:
        return jsonify({'error': 'No code provided'}), 400

    result = analyze_code(code)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
