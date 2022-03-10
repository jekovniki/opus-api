import puppeteer from "puppeteer";
import { convertToObject } from "./helper";

export class BulgarianStockExchange {

    public async getListedInstruments() {
        const values = await this.getAsset('#ListedInstrumentsUnited_TableSession_0');
        const keys: Array<string> = ['code', 'name', 'CFI', 'LEI', 'FISN', 'Volume', 'Nominal', 'Currency'];

        return convertToObject(keys, values);
    }

    private async getAsset(htmlId: string) {
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