import { test, expect } from '@playwright/test';
import configurations from '../config/config.json'
import { TestData } from '../testdata/testdata';
import { BasePage } from '../utils/basePage.page'


test.describe('API Test cases', () => {
    let bookingId: string;
    let token: string;

    test('Post : Create a new booking', async ({ request }) => {
        // Fetching the request body with runtime parameters
        const requestBody = await new BasePage().postRequestBody(configurations.requestBody, TestData.FullName, TestData.Surname, TestData.AddNeeds);
        // Post api call to create a booking
        const postResponse = await request.post(configurations.apiUrl, {
            headers: configurations.headers,
            data: requestBody
        });

        // Validateing status and status code of the post api call
        expect(postResponse).toBeOK();
        expect(postResponse.status()).toBe(200);
        bookingId = (await postResponse.json()).bookingid;
    });

    test('Get : Get details of created booking', async ({ request }) => {
        // Get api call to retrive the data of created booking
        const getResponse = await request.get((configurations.apiUrl + bookingId));
        // Validateing status and status code of the get api call
        expect(getResponse).toBeOK();
        expect(getResponse.status()).toBe(200);
        const response = await getResponse.json();

        // Validating the properties of the created booking
        expect(response).toHaveProperty(TestData.FirstName, TestData.FullName);
        expect(response).toHaveProperty(TestData.LastName, TestData.Surname);
        expect(response).toHaveProperty(TestData.AdditionalNeeds, TestData.AddNeeds);
        expect(response.bookingdates).toHaveProperty(TestData.CheckInDate, TestData.DateCheckIn);
        expect(response.bookingdates).toHaveProperty(TestData.CheckIOutDate, TestData.DateCheckout);
    });

    test('Post : Generate token', async ({ request }) => {
        // Post api call to create a access token
        const tokenResponse = await request.post(configurations.tokenUrl, {
            headers: configurations.headers,
            data: configurations.tokenbody
        });

        // Validateing status and status code of the post api call
        expect(tokenResponse).toBeOK();
        expect(tokenResponse.status()).toBe(200);
        token = (await tokenResponse.json()).token;
    });

    test('Put : Update a new booking', async ({ request }) => {
        // Fetching the request body with runtime parameters
        const requestBody = await new BasePage().postRequestBody(configurations.requestBody, TestData.UpdateFullName, TestData.UpdateSurname, TestData.UpdateAddNeeds);
        // Put api call to update the created booking
        const putResponse = await request.put((configurations.apiUrl + bookingId), {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            },
            data: requestBody
        });

        // Validateing status and status code of the put api call
        expect(putResponse).toBeOK();
        expect(putResponse.status()).toBe(200);
        const response = await putResponse.json();

        // Validating the properties of the updated booking
        expect(response).toHaveProperty(TestData.FirstName, TestData.UpdateFullName);
        expect(response).toHaveProperty(TestData.LastName, TestData.UpdateSurname);
        expect(response).toHaveProperty(TestData.AdditionalNeeds, TestData.UpdateAddNeeds);
    });

    test('Patch : Update the name', async ({ request }) => {
        // Fetching the request body with runtime parameters
        const requestBody = await new BasePage().postRequestBody(configurations.patchBody, TestData.PatchFullName, TestData.PatchSurname, TestData.PatchAddNeeds);
        // Patch api call to partially update the created booking
        const putResponse = await request.patch((configurations.apiUrl + bookingId), {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            },
            data: requestBody
        });

        // Validateing status and status code of the patch api call
        expect(putResponse).toBeOK();
        expect(putResponse.status()).toBe(200);
        const response = await putResponse.json();

        // Validating the properties of the partially updated booking
        expect(response).toHaveProperty(TestData.FirstName, TestData.PatchFullName);
        expect(response).toHaveProperty(TestData.LastName, TestData.PatchSurname);
        expect(response).toHaveProperty(TestData.AdditionalNeeds, TestData.PatchAddNeeds);
    });

        test('Delete : Update the name', async ({ request }) => {
        // Delete api call to create a booking
        const deleteResponse = await request.delete((configurations.apiUrl + bookingId), {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            },
        });

        // Validateing status and status code of the delete api call
        expect(deleteResponse).toBeOK();
        expect(deleteResponse.status()).toBe(201);
    });

        test('Negative : Get details of deleted booking', async ({ request }) => {
        // Get api call to retrive the data of deleted booking
        const getResponse = await request.get((configurations.apiUrl + bookingId));

        // Validateing status and status code of the get api call
        expect(getResponse.status()).toBe(404);
        expect(getResponse.statusText()).toBe(TestData.NotFound);
    });

        test('Negative : Create a new booking with invalid headers', async ({ request }) => {
        // Fetching the request body with runtime parameters
        const requestBody = await new BasePage().postRequestBody(configurations.requestBody, TestData.FullName, TestData.Surname, TestData.AddNeeds);
        // Post api call to create a booking
        const postResponse = await request.post(configurations.apiUrl, {
            headers: configurations.invalidHeaders,
            data: requestBody
        });

        // Validateing status and status code of the post api call
        expect(postResponse.status()).toBe(500);
        expect(postResponse.statusText()).toBe(TestData.ServerError);
    });

        test('Negative : Update created booking without access token ', async ({ request }) => {
        // Fetching the request body with runtime parameters
        const requestBody = await new BasePage().postRequestBody(configurations.requestBody, TestData.UpdateFullName, TestData.UpdateSurname, TestData.UpdateAddNeeds);
        // Put api call to update the created booking
        const putResponse = await request.put((configurations.apiUrl + bookingId), {
            headers: configurations.headers,
            data: requestBody
        });

        // Validateing status and status code of the put api call
        expect(putResponse.status()).toBe(403);
        expect(putResponse.statusText()).toBe(TestData.Forbidden);
    });
});

