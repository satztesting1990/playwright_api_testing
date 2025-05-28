import { test } from '@playwright/test';
import { BasePage } from '../utils/basePage.page'


test.describe('API Test cases', () => {
    let basePage: BasePage;

    test('CRUD operations with POST, GET, PUT, PATCH & DELETE requests using request chaining', async ({ page }) => {
        basePage = new BasePage(page);
        // Creating a booking using POST api request
        await basePage.postApiCall();
        // Retrieving the data of created booking using GET api request
        await basePage.getApiCall();
        // Generating access token using POST api request
        await basePage.generateToken();
        // Updating the created booking using PUT api request
        await basePage.patchApiCall();
        // Updating partiallu the created booking using PATCH api request
        await basePage.putApiCall();
        // Deleting a booking using DELETE api request
        await basePage.deleteApiCall();
    });

    test('Negative : Get details of deleted booking', async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.getDeletedBookingDetails();
    });

    test('Negative : Create a new booking with invalid headers', async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.getDeletedBookingDetails();
    });

    test('Negative : Update the created booking without token', async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.getDeletedBookingDetails();
    });
});

