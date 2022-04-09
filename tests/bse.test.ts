import puppeteer from 'puppeteer';
import { addBSEAssets } from '../src/service/BulgarianStockExchange';
import { database } from '../src/index';
jest.setTimeout(25000);


describe('BulgarianStockExchange service methods', () => {
    let browser: any;
    let page: any;
    const assetType = `Акции на дружества със специална инвестиционна цел (АДСИЦ)`;
    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = (await browser.pages())[0];
    });
    test('+ addBSEAssets | return true', async () => {
        const result = await addBSEAssets(assetType, 
            page, 
            '#ListedInstrumentsUnited_TableSession_0'
        );

        expect(result).toBe(true);
    });
    afterAll(async () => {
        // TODO: Delete the test data
        await browser.close();
        await database.end();
    });
})