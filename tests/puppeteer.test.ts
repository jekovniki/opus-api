import puppeteer from "puppeteer";
import { BulgarianStockExchange, ManagementCompanies } from '../src/utils/puppeteer';

jest.setTimeout(20000);

let browser: any;
let page: any;

// describe('BulgarianStockExchange methods test', () => {
//     beforeAll(async () => {
//         browser = await puppeteer.launch({ headless: true });
//         page = (await browser.pages())[0];
//     })
//     test('+ getListedInstruments | return array', async () => {
//         const result = await new BulgarianStockExchange().getListedInstruments(page, '#ListedInstrumentsUnited_TableSession_0');
        
//         expect(!('error' in result) && result.length > 0).toBe(true);
//         expect(!('error' in result) && 'code' in result[0]).toBe(true);
//     });

//     test('- getListedInstruments | return FailedResponse', async () => {
//         const result = await new BulgarianStockExchange().getListedInstruments(page, 'wrongElement');
        
//         expect('error' in result).toBe(true);
//     })
    
//     test('+ getListedSegments | return array', async () => {
//         const result = await new BulgarianStockExchange().getListedSegments(page);
        
//         expect(!('error' in result) && result[0].length > 1).toBe(true);
//     })

//     test('+ getInstrumentData | return IBSEAsset', async () => {
//         const result =  await new BulgarianStockExchange().getInstrumentData(page, 'EUBG');

//         expect('asset' in result).toBe(true);
//         expect('marketData' in result).toBe(true);
//         expect('marketSession' in result).toBe(true);
//     })
//     afterAll(async () => {
//         browser.close();
//     })


//     // test('+ getCompaniesData | return data', async () => {
//     //     const result = await new CompanyData().getCompanies();
//     //     console.log(result);
        
//     //     expect(result).toBeDefined();
//     // })
// })

describe.only('Commercial Register methods test', () => {
    test.only('+ getListedInstruments | return array', async () => {
        const result = await new ManagementCompanies().getCompanies();
        console.log(result);
        expect(result).toBeDefined();
        
        // expect(!('error' in result) && result.length > 0).toBe(true);
        // expect(!('error' in result) && 'code' in result[0]).toBe(true);
    });
    afterAll(async () => {
        browser.close();
    })
});


