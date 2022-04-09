import puppeteer from 'puppeteer';
import { addBSEAssets } from '../src/service/BulgarianStockExchange';

jest.setTimeout(20000);


describe('BulgarianStockExchange service methods', () => {
    let browser: any;
    let page: any;
    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = (await browser.pages())[0];
    });
    test('', async () => {
        const result = await addBSEAssets(`Акции на дружества със специална инвестиционна цел (АДСИЦ)`, 
            page, 
            '#ListedInstrumentsUnited_TableSession_0'
        );

        console.log(result);
        expect(result).toBeDefined();
    });
    afterAll(async () => {
        browser.close();
    });
})