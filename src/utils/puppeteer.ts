import puppeteer from "puppeteer";
import { convertToObject } from "./helper";
import { FailedResponse } from "../interfaces/utils";

export class BulgarianStockExchange {

    public async getListedSegments(): Promise<Array<string[]> | FailedResponse> {
        const browser = await puppeteer.launch({ headless: true });
        const page = (await browser.pages())[0];

        await page.goto(`https://www.bse-sofia.bg/bg/listed-instruments/by-instrument`, {waitUntil: 'networkidle0'});
        
        const data = await page.$$eval('.left_inner_padded', (elements) => {
            return Array.from(elements, (element) => {
                const data = element.querySelectorAll('.ellipsis');
                return Array.from(data, (text:any) => text.innerText);
            })
        });

        browser.close();

        if (data === []) {
            return {
                error: 404,
                code: 'NOT_FOUND',
                message: `Puppeteer: could not fetch segments`
            }
        }
            
        return data;
    }

    public async getListedInstruments(htmlId: string): Promise<Array<object> | FailedResponse> {
        const values = await this.getAssetFromTable(htmlId);

        if (values.length === 0) {
            return {
                error: 404,
                code: 'NOT_FOUND',
                message: `Puppeteer: data fetch failed for element: ${htmlId}`
            }
        }

        const keys: Array<string> = ['code', 'name', 'CFI', 'LEI', 'FISN', 'Volume', 'Nominal', 'Currency'];

        return convertToObject(keys, values);
    }

    private async getAssetFromTable(htmlId: string): Promise<Array<string[]>> {
        const browser = await puppeteer.launch({ headless: true});
        const page = (await browser.pages())[0];

        await page.goto(`https://www.bse-sofia.bg/bg/listed-instruments/by-instrument`, {waitUntil: 'networkidle0'});
        const data = await page.$$eval(
            `#ListedInstrumentsUnited ${htmlId} tr`, (rows: any) => {
                return Array.from(rows, (row: any) => {
                    const columns = row.querySelectorAll('td');
                    return Array.from(columns, (column: any) => column.innerText);
                })
            }
        );
        
        // Remove unnecessary title and button;
        data.shift();
        data.pop();
        browser.close();

        return data;
    }
}