import os
from flask import Flask, jsonify, request
import json
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load data from JSON file
with open('data.json', 'r') as f:
    data = json.load(f)

@app.route('/user', methods=['GET'])
def get_user():
    """
    Endpoint to get user information.
    This simulates fetching user data from a database.
    """
    return jsonify(data['user'])

@app.route('/stats', methods=['GET'])
def get_stats():
    """
    Endpoint to get overall document statistics.
    This simulates fetching aggregated document stats.
    """
    return jsonify(data['stats'])

@app.route('/documents', methods=['GET'])
def get_documents():
    """
    Endpoint to get a list of all documents.
    This simulates fetching documents from a database.
    """
    return jsonify(data['documents'])

@app.route('/documents/<int:id>', methods=['PUT'])
def update_document(id):
    """
    Endpoint to update the status of a document.
    Expects a JSON payload with the new status.
    Valid statuses: In Draft, In Review, Pending Approval, Complete
    """
    updated_status = request.json.get('status')
    if updated_status not in ['In Draft', 'In Review', 'Pending Approval', 'Complete']:
        return jsonify({'error': 'Invalid status'}), 400

    for doc in data['documents']:
        if doc['id'] == id:
            # Update statistics
            old_status = doc['status']
            doc['status'] = updated_status
            if old_status != updated_status:
                # Decrement the count for the old status
                if old_status == 'In Draft':
                    data['stats']['inDraft'] -= 1
                elif old_status == 'In Review':
                    data['stats']['inReview'] -= 1
                elif old_status == 'Pending Approval':
                    data['stats']['pendingApproval'] -= 1
                elif old_status == 'Complete':
                    data['stats']['complete'] -= 1

                # Increment the count for the new status
                if updated_status == 'In Draft':
                    data['stats']['inDraft'] += 1
                elif updated_status == 'In Review':
                    data['stats']['inReview'] += 1
                elif updated_status == 'Pending Approval':
                    data['stats']['pendingApproval'] += 1
                elif updated_status == 'Complete':
                    data['stats']['complete'] += 1

            # Update the last edited date to the current date in YYYY-MM-DD format
            doc['lastEdited'] = datetime.now().strftime('%Y-%m-%d')

            return jsonify(doc)

    return jsonify({'error': 'Document not found'}), 404

if __name__ == '__main__':
    # Get the port from environment variables or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
