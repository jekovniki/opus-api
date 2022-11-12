import { getCommercialData } from "../src/service/external/commercial-register";

describe('commercial-register services', () => {
    test('+ getCommercialData | should return TManagementCompany properties', async () => {
        const result = await getCommercialData('175263888');
        
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('uic');
        expect(result).toHaveProperty('legalForm');
        expect(result).toHaveProperty('paidInCapital');
    });
    test('+ getCommercialData | should return TManagementCompany properties', async () => {
        const result = await getCommercialData('131422901');
        
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('uic');
        expect(result).toHaveProperty('legalForm');
        expect(result).toHaveProperty('paidInCapital');
    });
    test('- getCommercialData | should return success false', async () => {
        const result = await getCommercialData('222111');
        
        expect(result).toHaveProperty('success');
    });
});