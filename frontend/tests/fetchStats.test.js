/**
 * File: fetchStats.test.js
 * Date: 2024-07-19
 * Description: This file contains tests for the fetchStats function.
 *              It mocks the fetch API to test the behavior of fetching and displaying document statistics.
Safe Programming Measures:
- Mocking: Used Jest to mock the fetch API for isolated testing.
- Assertions: Included assertions to verify the correct behavior of the function.
 */

const { fetchStats } = require('../app');

test('fetches document statistics and updates the DOM', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                totalDocuments: 5,
                inDraft: 1,
                inReview: 1,
                pendingApproval: 1,
                complete: 2
            })
        })
    );

    // Mock the DOM element
    document.body.innerHTML = '<div id="stats"></div>';

    // Call the function
    await fetchStats();

    // Assert that fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/stats');

    // Assert that the stats info was correctly added to the DOM
    expect(document.getElementById('stats').innerHTML).toContain('Total Documents: 5');
    expect(document.getElementById('stats').innerHTML).toContain('In Draft: 1');
    expect(document.getElementById('stats').innerHTML).toContain('In Review: 1');
    expect(document.getElementById('stats').innerHTML).toContain('Pending Approval: 1');
    expect(document.getElementById('stats').innerHTML).toContain('Complete: 2');
});
