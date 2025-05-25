import configurations from '../config/config.json';
import { stringFormat } from '../utils/testUtils';
import { APIRequest } from '@playwright/test';

export class BasePage {

    public async postRequestBody(jsonBody: any, firstName: string, lastName: string, extraBenefits: string) {
        const requestBody = stringFormat(JSON.stringify(jsonBody), firstName, lastName, extraBenefits);
        return requestBody;
    }
}



