/**
 * File: fetchUserInfo.test.js
 * Date: 2024-07-19
 * Description: This file contains tests for the fetchUserInfo function.
 *              It mocks the fetch API to test the behavior of fetching and displaying user information.
Safe Programming Measures:
- Mocking: Used Jest to mock the fetch API for isolated testing.
- Assertions: Included assertions to verify the correct behavior of the function.
 */

const { fetchUserInfo } = require('../app');

test('fetches user info and updates the DOM', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'Admin'
            })
        })
    );

    // Mock the DOM element
    document.body.innerHTML = '<div id="user-info"></div>';

    // Call the function
    await fetchUserInfo();

    // Assert that fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/user');

    // Assert that the user info was correctly added to the DOM
    expect(document.getElementById('user-info').innerHTML).toContain('John Doe');
    expect(document.getElementById('user-info').innerHTML).toContain('john.doe@example.com');
    expect(document.getElementById('user-info').innerHTML).toContain('Admin');
});
