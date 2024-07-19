# Take Home Assignment

## Overview

The purpose of the Take Home Assignment is to develop a web application designed to manage and track the status of various documents. It displays user information, overall document statistics, and a list of individual documents with their statuses. Users can view and update document statuses, with changes dynamically reflected in the document statistics and last edited date.

## Features

- **Display User Information**: The application displays the logged-in user's name, email, and role, fetched from the backend.
- **Show Overall Document Statistics**: Provides an overview of the total number of documents and their statuses (In Draft, In Review, Pending Approval, and Complete).
- **List All Documents**: Displays all documents with name, current status, and last edited date.
- **Update Document Statuses**: Allows users to change the status of a document, automatically updating the statistics and the last edited date.
- **CORS Enabled**: Cross-Origin Resource Sharing is enabled to allow frontend/backend communication even when hosted on different domains.

## Technology Stack

- **Backend**: `Python` and `Flask` were utilized for simplicity and flexibility in creating RESTful APIs. Flask is lightweight and ideal for small to medium-sized applications.
- **Frontend**: `HTML`, `CSS`, and `Javascript` were used to ensure a fundamental understanding of web development without reliance on frontend frameworks.
- **CORS**: The `flask-cors` extension was used to handle Cross-Origin Resource Sharing, making it easier to integrate the frontend and backend.
- **Testing**: `unittest` for Python allows us to write and run tests for the backend, while `Jest` is a powerful testing framework for JavaScript, perfect for our frontend tests.

## Setup Instructions

### Prerequisites

- **Python 3.x**: The latest version of Python is required for the backend.
- **Node.js**: Necessary for running JavaScript code outside the browser and for package management.
- **npm**: Node Package Manager to manage JavaScript dependencies.
- **Git**: Version control system to manage source code.

### Backend Setup

1. **Clone the Repository**: Clone the repository to ensure the latest version of the codebase is utilized.
```
git clone https://github.com/michaelcodes991/take-home.git
cd take-home/backend
```
2. **Create and Activate a Virtual Environment**: Use a virtual environment to isolate project dependencies, avoiding conflicts with other projects.
```
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```
3. **Install Dependencies**: Install all the required Python packages
```
pip3 install flask
```

4. **Run the Flask Application**: Start the backend server on the specified port, ready to handle API requests.
```
python3 app.py
```
### Frontend Setup

1. **Navigate to the Frontend Directory**: Move to the directory containing the frontend code.
```
cd ../frontend
```


2. **Install Dependencies**: Install all JavaScript packages specified in `package.json`.
```
npm install
```
3. **Run the Frontend (for development)**: Use a simple HTTP server to serve the frontend files, making the application accessible via
`
python -m http.server 8000
http://localhost:8000
`.

### Testing

#### Backend Tests

1. **Run Backend Tests**: Discover and run all test cases in the backend tests directory to ensure the API functions correctly.
`
cd backend
python -m unittest discover
`

#### Frontend Tests

1. **Run Frontend Tests**: Run all Jest test cases to ensure the frontend functions as expected.

`
cd frontend
npx jest
`
## File Structure

The file structure organizes the backend and frontend code separately; promoting a clear separation of concerns and easier navigation:

```plaintext
take-home/
├── backend/
│   ├── venv/ (excluded from GitHub)
│   ├── app.py
│   ├── data.json
│   ├── requirements.txt
│   ├── tests/
│   │   └── test_app.py
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── package.json
│   ├── tests/
│   │   ├── fetchUserInfo.test.js
│   │   ├── fetchStats.test.js
│   │   └── fetchDocuments.test.js
├── README.md
└── .gitignore
```

## Development Process

### Initial Setup

- Created the backend using Flask to serve as the RESTful API.
- Set up the frontend with HTML, CSS, and JavaScript for the user interface.

### Implemented Endpoints

- Defined endpoints for retrieving user information, document stats, and document lists, as well as updating document statuses.

### Enabled CORS

- Used `flask-cors` to enable CORS for all routes, allowing seamless communication between the frontend and backend.

### Dynamic Statistics Update

- Implemented logic to update document stats dynamically when a document's status changes.


### Testing

- Wrote unit tests for the backend using `unittest` to ensure the API endpoints function correctly.
- Wrote tests for the frontend using `Jest` to verify the user interface and interaction logic.
- Comprehensive testing helps identify and fix bugs early, ensuring a robust and reliable application.

## Safe Programming Measures

### Input Validation

- Ensured that only valid document statuses ('In Draft', 'In Review', 'Pending Approval', 'Complete') are accepted by the `PUT /documents/{id}` endpoint.

### Error Handling

- Implemented error handling for API requests to handle cases where documents are not found or invalid statuses are provided.

### Security

- Enabled Cross-Origin Resource Sharing (CORS) to control access to the API from different domains, enhancing security.

### Environment Isolation

- Used virtual environments to isolate project dependencies, preventing conflicts with other projects.

### Code Organization

- Followed a modular code structure to separate concerns and improve maintainability.

### Comprehensive Testing

- Wrote unit tests for both backend and frontend to ensure code correctness and catch potential issues early.

## Conclusion

This project demonstrates the development of a Document Management Dashboard using Flask for the backend and vanilla JavaScript for the frontend. It includes features like dynamic statistics updates, CORS support, and date formatting. The project is thoroughly tested and documented, making it easy to understand and extend. The careful consideration of best practices and clear documentation ensures that this project is maintainable and scalable, providing a solid foundation for future enhancements.
