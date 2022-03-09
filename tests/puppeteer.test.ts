import { BulgarianStockExchange } from '../src/utils/puppeteer';

describe('BulgarianStockExchange methods test', () => {
    test('+ getListedInstruments should return array', async () => {
        const result = new BulgarianStockExchange().getListedInstruments();
        console.log(result);
        
        expect(result).toBeDefined();
    });
})