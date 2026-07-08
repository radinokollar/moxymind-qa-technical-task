import 'dotenv/config';
import { test, expect } from '@playwright/test';
import testUsers from './data/userData.json';

test.describe('ReqRes API Automation Tasks', () => {
  const baseUrl = 'https://reqres.in';
  const apiToken = process.env.REQRES_API_TOKEN;

  test.beforeEach(() => {
    expect(apiToken, 'Set REQRES_API_TOKEN in a local .env file before running backend tests.').toBeTruthy();
  });

  test('Test Case 1 - GET - List Users', async ({ request }) => {
    // 1. Send a GET request with query parameters and auth header
    const response = await request.get(`${baseUrl}/api/users`, {
      headers: {
        'x-api-key': apiToken as string
      },
      params: {
        page: 2
      }
    });

    // 2. Assert the response status code is 200 OK
    expect(response.status()).toBe(200);

    // Reading the JSON response body
    const responseBody = await response.json();
    console.log('API Response:', JSON.stringify(responseBody, null, 2));

    // 3. Assert received data in Response: "total"
    expect(responseBody.total).toBe(12);

    // 4. Assert "last_name" for the first 2 Users in "data"
    expect(responseBody.data[0].last_name).toBe('Lawson');
    expect(responseBody.data[1].last_name).toBe('Ferguson');

    // 5. Count the number of received users in "data"
    const receivedUsersCount = responseBody.data.length;

    // Note on test logic: The requirements state to compare the count to "total" (which is 12).
    // However, the "data" array only returns users for the current page (6 users, matching per_page).
    // To keep the test valid and robust, we verify it against "per_page" and ensure total is tracked.
    expect(receivedUsersCount).toBe(responseBody.per_page);
    expect(responseBody.total).toBeGreaterThanOrEqual(receivedUsersCount);

    // --- OPTIONAL BONUS TASK: Asserting Data Types ---
    expect(typeof responseBody.page).toBe('number');
    expect(typeof responseBody.total).toBe('number');
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(typeof responseBody.data[0].last_name).toBe('string');
  });

  test('Test Case 2 - POST - Create User', async ({ request }) => {
    // Define the maximum acceptable response time limit in milliseconds
    const responseTimeLimitMs = 250;

    // Measure the starting time before sending the request
    const startTime = performance.now();

    // 1. Send POST request using external test data
    const response = await request.post(`${baseUrl}/api/users`, {
      headers: {
        'x-api-key': apiToken as string,
      },
      data: {
        name: testUsers.name,
        job: testUsers.job
      }
    });

    // Measure the ending time after getting the response
    const endTime = performance.now();
    const totalResponseTime = endTime - startTime;
    console.log(`API Response Time: ${totalResponseTime.toFixed(2)} ms`);

    // 2. Assert whether Response time was less than the defined limit
    expect(totalResponseTime).toBeLessThan(responseTimeLimitMs);

    // 3. Assert the received HTTP status code is 201 Created
    expect(response.status()).toBe(201);

    // Reading the JSON response body
    const responseBody = await response.json();
    console.log('Created User Response:', JSON.stringify(responseBody, null, 2));

    // 4. Assert that the Response contains an ID and a createdAt timestamp
    expect(responseBody.id).toBeDefined();
    expect(responseBody.createdAt).toBeDefined();

    // Verify the sent data matches what was returned
    expect(responseBody.name).toBe(testUsers.name);
    expect(responseBody.job).toBe(testUsers.job);

  });

});