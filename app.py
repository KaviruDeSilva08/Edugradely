from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

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

# ... rest of your existing endpoints ...

if __name__ == '__main__':
    app.run(debug=True) 