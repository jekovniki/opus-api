import { BulgarianStockExchange } from '../src/utils/puppeteer';

jest.setTimeout(20000);

describe('BulgarianStockExchange methods test', () => {
    test('+ getListedInstruments | return array', async () => {
        const result = await new BulgarianStockExchange().getListedInstruments();
        
        expect(result.length > 0).toBe(true);
        expect('code' in result[0]).toBe(true);
        expect('name' in result[0]).toBe(true);
        expect('CFI' in result[0]).toBe(true);
        expect('LEI' in result[0]).toBe(true);
    });
    
    test('+ getListedSegments | return array', async () => {
        const result = await new BulgarianStockExchange().getListedSegments();
        
        expect(result[0].length > 1).toBe(true);
    })
})