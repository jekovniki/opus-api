import { BulgarianStockExchange } from '../src/utils/puppeteer';

jest.setTimeout(10000);

describe('BulgarianStockExchange methods test', () => {
    test('+ getListedInstruments should return array', async () => {
        const result = await new BulgarianStockExchange().getListedInstruments();
        
        expect(result.length > 0).toBe(true);
        expect('code' in result[0]).toBe(true);
        expect('name' in result[0]).toBe(true);
        expect('CFI' in result[0]).toBe(true);
        expect('LEI' in result[0]).toBe(true);
    });
})