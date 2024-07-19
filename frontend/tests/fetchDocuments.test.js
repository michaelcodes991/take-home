/**
 * File: fetchDocuments.test.js
 * Date: 2024-07-19
 * Description: This file contains tests for the fetchDocuments function.
 *              It mocks the fetch API to test the behavior of fetching and displaying documents.
Safe Programming Measures:
- Mocking: Used Jest to mock the fetch API for isolated testing.
- Assertions: Included assertions to verify the correct behavior of the function.
 */

const { fetchDocuments } = require('../app');

test('fetches documents and updates the DOM', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([
                {
                    id: 1,
                    name: 'Project Proposal',
                    status: 'In Review',
                    lastEdited: '2024-06-10'
                }
            ])
        })
    );

    // Mock the DOM element
    document.body.innerHTML = '<div id="documents"></div>';

    // Call the function
    await fetchDocuments();

    // Assert that fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/documents');

    // Assert that the documents were correctly added to the DOM
    expect(document.getElementById('documents').innerHTML).toContain('Project Proposal');
    expect(document.getElementById('documents').innerHTML).toContain('In Review');
    expect(document.getElementById('documents').innerHTML).toContain('2024-06-10');
});
