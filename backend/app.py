from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
import pickle
from werkzeug.utils import secure_filename
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances, manhattan_distances
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import nltk

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Configure allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

# Download required NLTK resources
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# Load the trained model
try:
    with open('coursework_grading_model.pkl', 'rb') as file:
        model = pickle.load(file)
except FileNotFoundError:
    print("Warning: Model file not found. Please ensure coursework_grading_model.pkl exists.")
    model = None

# Configure logging
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),  # Log to console
        logging.FileHandler('app.log')  # Log to file
    ]
)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'[^\w\s]', '', text)
    text = ' '.join([word for word in text.split() if word not in stopwords.words('english')])
    text = ' '.join([PorterStemmer().stem(word) for word in text.split()])
    return text

@app.route('/grade', methods=['POST'])
def grade_assignment():
    try:
        # Check if files are present in request
        if 'assignment' not in request.files or 'rubric' not in request.files or 'answers' not in request.files:
            return jsonify({
                'error': 'Missing required files'
            }), 400

        assignment_file = request.files['assignment']
        rubric_file = request.files['rubric']
        answers_file = request.files['answers']
        note = request.form.get('note', '')

        # Check if files are valid
        if not all([assignment_file.filename, rubric_file.filename, answers_file.filename]):
            return jsonify({
                'error': 'No selected file'
            }), 400

        if not all([allowed_file(f.filename) for f in [assignment_file, rubric_file, answers_file]]):
            return jsonify({
                'error': 'Invalid file type. Only PDF and Word documents are allowed.'
            }), 400

        # Save files temporarily
        assignment_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(assignment_file.filename))
        rubric_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(rubric_file.filename))
        answers_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(answers_file.filename))

        assignment_file.save(assignment_path)
        rubric_file.save(rubric_path)
        answers_file.save(answers_path)

        # TODO: Add your file processing logic here
        # For now, we'll return a mock response
        response = {
            'score': 85,
            'feedback': 'Good work! The assignment shows a solid understanding of the concepts.',
            'detailed_feedback': 'Your answer demonstrates good comprehension of the subject matter. Areas for improvement include providing more specific examples and technical details.'
        }

        # Clean up temporary files
        for file_path in [assignment_path, rubric_path, answers_path]:
            if os.path.exists(file_path):
                os.remove(file_path)

        return jsonify(response), 200

    except Exception as e:
        logging.error(f"Error in grading endpoint: {str(e)}")
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/log', methods=['POST'])
def log_message():
    try:
        log_data = request.json
        timestamp = log_data.get('timestamp', datetime.now().isoformat())
        log_type = log_data.get('type', 'INFO')
        message = log_data.get('message', '')
        
        # Format the log message
        log_message = f"[{timestamp}] {log_type}: {message}"
        
        # Add additional data if present
        for key, value in log_data.items():
            if key not in ['timestamp', 'type', 'message']:
                log_message += f"\n{key}: {value}"
        
        # Log based on type
        if log_type == 'ERROR':
            logging.error(log_message)
        elif log_type == 'WARNING':
            logging.warning(log_message)
        elif log_type == 'SUCCESS':
            logging.info(f"✅ {log_message}")
        else:
            logging.info(log_message)
        
        return jsonify({"status": "success"}), 200
    except Exception as e:
        logging.error(f"Error in logging endpoint: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 