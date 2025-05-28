import { stringFormat, TestUtils } from '../utils/testUtils';
import { expect } from '@playwright/test';

let bookingId: string;
let token: string;
let testData = TestUtils.testData();
let configurations = TestUtils.config();
export class BasePage extends TestUtils {


    public async postRequestBody(jsonBody: any, firstName: string, lastName: string, extraBenefits: string) {
        const requestBody = stringFormat(JSON.stringify(jsonBody), firstName, lastName, extraBenefits);
        return requestBody;
    }

    public async postApiCall() {
        // Fetching the request body with runtime parameters
        const requestBody = await this.postRequestBody(configurations.requestBody, testData.FullName, testData.Surname, testData.AddNeeds);
        // Post api call to create a booking
        const postResponse = await this.page.request.post(configurations.apiUrl, {
            headers: configurations.headers,
            data: requestBody
        });

        // Validateing status and status code of the post api call
        expect(postResponse).toBeOK();
        expect(postResponse.status()).toBe(200);
        bookingId = (await postResponse.json()).bookingid;
    }

    public async getApiCall() {
        // Get api call to retrive the data of created booking
        const getResponse = await this.page.request.get((configurations.apiUrl + bookingId));
        // Validateing status and status code of the get api call
        expect(getResponse).toBeOK();
        expect(getResponse.status()).toBe(200);
        const response = await getResponse.json();

        // Validating the properties of the created booking
        expect(response).toHaveProperty(testData.FirstName, testData.FullName);
        expect(response).toHaveProperty(testData.LastName, testData.Surname);
        expect(response).toHaveProperty(testData.AdditionalNeeds, testData.AddNeeds);
        expect(response.bookingdates).toHaveProperty(testData.CheckInDate, testData.DateCheckIn);
        expect(response.bookingdates).toHaveProperty(testData.CheckIOutDate, testData.DateCheckout);
    }

    public async generateToken() {
        // Post api call to create a access token
        const tokenResponse = await this.page.request.post(configurations.tokenUrl, {
            headers: configurations.headers,
            data: configurations.tokenbody
        });

        // Validateing status and status code of the post api call
        expect(tokenResponse).toBeOK();
        expect(tokenResponse.status()).toBe(200);
        token = (await tokenResponse.json()).token;
    }

    public async putApiCall() {
        // Fetching the request body with runtime parameters
        const requestBody = await this.postRequestBody(configurations.requestBody, testData.UpdateFullName, testData.UpdateSurname, testData.UpdateAddNeeds);
        // Put api call to update the created booking
        const putResponse = await this.page.request.put((configurations.apiUrl + bookingId), {
            headers: this.buildHeaders(token),
            data: requestBody
        });

        // Validateing status and status code of the put api call
        expect(putResponse).toBeOK();
        expect(putResponse.status()).toBe(200);
        const response = await putResponse.json();

        // Validating the properties of the updated booking
        expect(response).toHaveProperty(testData.FirstName, testData.UpdateFullName);
        expect(response).toHaveProperty(testData.LastName, testData.UpdateSurname);
        expect(response).toHaveProperty(testData.AdditionalNeeds, testData.UpdateAddNeeds);
    }

    public async patchApiCall() {
        // Fetching the request body with runtime parameters
        const requestBody = await this.postRequestBody(configurations.patchBody, testData.PatchFullName, testData.PatchSurname, testData.PatchAddNeeds);
        // Patch api call to partially update the created booking
        const putResponse = await this.page.request.patch((configurations.apiUrl + bookingId), {
            headers: this.buildHeaders(token),
            data: requestBody
        });

        // Validateing status and status code of the patch api call
        expect(putResponse).toBeOK();
        expect(putResponse.status()).toBe(200);
        const response = await putResponse.json();

        // Validating the properties of the partially updated booking
        expect(response).toHaveProperty(testData.FirstName, testData.PatchFullName);
        expect(response).toHaveProperty(testData.LastName, testData.PatchSurname);
        expect(response).toHaveProperty(testData.AdditionalNeeds, testData.PatchAddNeeds);
    }

    public async deleteApiCall() {
        // Delete api call to create a booking
        const deleteResponse = await this.page.request.delete((configurations.apiUrl + bookingId), {
            headers: this.buildHeaders(token)
        });

        // Validateing status and status code of the delete api call
        expect(deleteResponse).toBeOK();
        expect(deleteResponse.status()).toBe(201);
    }

    public async getDeletedBookingDetails() {
        // Get api call to retrive the data of deleted booking
        const getResponse = await this.page.request.get((configurations.apiUrl + bookingId));

        // Validateing status and status code of the get api call
        expect(getResponse.status()).toBe(404);
        expect(getResponse.statusText()).toBe(testData.NotFound);
    }

    public async createBookingWithInvalidHeaders() {
        // Fetching the request body with runtime parameters
        const requestBody = await this.postRequestBody(configurations.requestBody, testData.FullName, testData.Surname, testData.AddNeeds);
        // Post api call to create a booking
        const postResponse = await this.page.request.post(configurations.apiUrl, {
            headers: configurations.invalidHeaders,
            data: requestBody
        });

        // Validateing status and status code of the post api call
        expect(postResponse.status()).toBe(500);
        expect(postResponse.statusText()).toBe(testData.ServerError);
    }

    public async updateCreatedBookingWithoutAccessToken() {
        // Fetching the request body with runtime parameters
        const requestBody = await this.postRequestBody(configurations.requestBody, testData.UpdateFullName, testData.UpdateSurname, testData.UpdateAddNeeds);
        // Put api call to update the created booking
        const putResponse = await this.page.request.put((configurations.apiUrl + bookingId), {
            headers: configurations.headers,
            data: requestBody
        });

        // Validateing status and status code of the put api call
        expect(putResponse.status()).toBe(403);
        expect(putResponse.statusText()).toBe(testData.Forbidden);
    }
}




