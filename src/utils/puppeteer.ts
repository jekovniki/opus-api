import puppeteer from "puppeteer";
import { convertToObject } from "./helper";
import { FailedResponse } from "../interfaces/utils";
import { IBSEAsset } from "../interfaces/puppeteer";

export class BulgarianStockExchange {

    public async getInstrumentData(assetCode: string): Promise<IBSEAsset | FailedResponse> {
        const browser = await puppeteer.launch({ headless: true });
        const page = (await browser.pages())[0];

        await page.goto(`https://www.bse-sofia.bg/bg/issuer-profile/${assetCode}/`, {waitUntil: 'networkidle0'});

        const assetPrice = await page.evaluate(() => {
            const banknote = document.querySelector('.ellipsis .price .banknotes');
            const coins = document.querySelector('.ellipsis .price .coins');
            const change = document.querySelector('.ellipsis .price .change');

            return {
                price: `${banknote?.innerHTML}.${coins?.innerHTML}`,
                change: `${change?.innerHTML}`
            }
        });

        const marketInfo = await page.$$eval('.right_inner_padded #table_profil_market_info tr', (rows) => {
            return Array.from(rows, (row) => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, (column: any) => column.innerText);
            })
        });

        const marketSession = await page.$$eval('.right_inner_padded #table_profil_market_session_results tr', (rows) => {
            return Array.from(rows, (row) => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, (column: any) => column.innerText);
            })
        });
        
        marketSession.shift();
        marketInfo.shift();
        
        const marketSessionResult = Object.fromEntries(marketSession);
        const marketData = Object.fromEntries(marketInfo);
        
        browser.close();

        return {
            asset: assetPrice,
            marketData: marketData,
            marketSession: marketSessionResult
        };
    }

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