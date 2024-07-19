import unittest
import json
from app import app

class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        # Set up a test client and enable testing mode
        self.app = app.test_client()
        self.app.testing = True

    def test_get_user(self):
        """
        Test the /user endpoint to ensure it returns the correct user information.
        """
        response = self.app.get('/user')
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertIn('name', data)
        self.assertIn('email', data)
        self.assertIn('role', data)

    def test_get_stats(self):
        """
        Test the /stats endpoint to ensure it returns the correct document statistics.
        """
        response = self.app.get('/stats')
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertIn('totalDocuments', data)
        self.assertIn('inDraft', data)
        self.assertIn('inReview', data)
        self.assertIn('pendingApproval', data)
        self.assertIn('complete', data)

    def test_get_documents(self):
        """
        Test the /documents endpoint to ensure it returns a list of documents.
        """
        response = self.app.get('/documents')
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)

    def test_update_document(self):
        """
        Test the /documents/<id> endpoint to ensure it updates a document's status.
        """
        update_data = {'status': 'Complete'}
        response = self.app.put('/documents/1', data=json.dumps(update_data), content_type='application/json')
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'Complete')

if __name__ == '__main__':
    unittest.main()

