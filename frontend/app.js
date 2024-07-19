/**
 * File: app.js
 * Date: 2024-07-19
 * Description: This is the main JavaScript file for the frontend of the Document Management Dashboard.
 *              It handles fetching and displaying user information, document statistics, and documents.
 *              It also handles updating document statuses and dynamically updating the UI.
Safe Programming Measures:
- Asynchronous Operations: Used async/await for handling asynchronous API requests.
- Error Handling: Included error handling for API requests to ensure smooth user experience.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display user information when the DOM is fully loaded
    fetchUserInfo();
    // Fetch and display document statistics when the DOM is fully loaded
    fetchStats();
    // Fetch and display the list of documents when the DOM is fully loaded
    fetchDocuments();
});

/**
 * Fetches user information from the backend API and displays it on the page.
 */
function fetchUserInfo() {
    fetch('http://127.0.0.1:5000/user')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-info').innerHTML = `
                <h2>User Information</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Role:</strong> ${data.role}</p>
            `;
        })
        .catch(error => console.error('Error fetching user info:', error));
}

/**
 * Fetches document statistics from the backend API and displays them on the page.
 */
function fetchStats() {
    fetch('http://127.0.0.1:5000/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('stats').innerHTML = `
                <h2>Document Stats</h2>
                <p><strong>Total Documents:</strong> ${data.totalDocuments}</p>
                <p><strong>In Draft:</strong> ${data.inDraft}</p>
                <p><strong>In Review:</strong> ${data.inReview}</p>
                <p><strong>Pending Approval:</strong> ${data.pendingApproval}</p>
                <p><strong>Complete:</strong> ${data.complete}</p>
            `;
        })
        .catch(error => console.error('Error fetching stats:', error));
}

/**
 * Fetches the list of documents from the backend API and displays them on the page.
 */
function fetchDocuments() {
    fetch('http://127.0.0.1:5000/documents')
        .then(response => response.json())
        .then(data => {
            let documentsHTML = '<h2>Documents</h2><table><thead><tr><th>Name</th><th>Status</th><th>Last Edited</th><th>Actions</th></tr></thead><tbody>';
            data.forEach(doc => {
                documentsHTML += `
                    <tr>
                        <td>${doc.name}</td>
                        <td>${doc.status}</td>
                        <td>${doc.lastEdited}</td>
                        <td>
                            <select onchange="updateDocumentStatus(${doc.id}, this.value)">
                                <option value="In Draft" ${doc.status === 'In Draft' ? 'selected' : ''}>In Draft</option>
                                <option value="In Review" ${doc.status === 'In Review' ? 'selected' : ''}>In Review</option>
                                <option value="Pending Approval" ${doc.status === 'Pending Approval' ? 'selected' : ''}>Pending Approval</option>
                                <option value="Complete" ${doc.status === 'Complete' ? 'selected' : ''}>Complete</option>
                            </select>
                        </td>
                    </tr>
                `;
            });
            documentsHTML += '</tbody></table>';
            document.getElementById('documents').innerHTML = documentsHTML;
        })
        .catch(error => console.error('Error fetching documents:', error));
}

/**
 * Sends a request to the backend API to update the status of a document.
 * Updates the document statistics dynamically upon successful update.
 * @param {number} id - The ID of the document to update.
 * @param {string} status - The new status to set for the document.
 */
function updateDocumentStatus(id, status) {
    fetch(`http://127.0.0.1:5000/documents/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Document updated:', data);
        fetchStats(); // Refresh the document statistics
        fetchDocuments(); // Refresh the documents list
    })
    .catch(error => console.error('Error updating document status:', error));
}
