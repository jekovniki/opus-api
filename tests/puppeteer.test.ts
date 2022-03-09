import { BulgarianStockExchange } from '../src/utils/puppeteer';

jest.setTimeout(10000);

describe('BulgarianStockExchange methods test', () => {
    test('+ getListedInstruments should return array', async () => {
        const result = await new BulgarianStockExchange().getListedInstruments();
        console.log(result);
        
        expect(result).toBeDefined();
    });
})