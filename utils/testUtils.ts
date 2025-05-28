/* String format.
* @param str String, needs to be formatted.
* @param args Arguments, needs to be placed properly in the string.
*/

import { Page } from "@playwright/test";
import configurations from '../config/config.json';
import { ProdData, QAData } from "../testdata/testdata";

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });


let data: any;
let config: any;
export class TestUtils {

    protected page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    static testData() {
        if (process.env.RUN_ENV = 'Test') {
            data = QAData;
            config = configurations.qa;
        }
        else {
            data = ProdData;
            config = configurations.prod;
        }
        return data;
    }

    static config() {
        if (process.env.RUN_ENV = 'Test') {
            data = QAData;
            config = configurations.qa;
        }
        else {
            data = ProdData;
            config = configurations.prod;
        }
        return config;
    }


    public buildHeaders(token: string): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            "Cookie": `token=${token}`
        };
    }
}

export const stringFormat = (str: string, ...args: any[]) =>
    str.replace(/{(\d+)}/g, (match: any, index: string | number) => args[index].toString() || "");

