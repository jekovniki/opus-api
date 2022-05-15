import { Unsplash } from"../src/utils/unsplash";

describe('Unsplash service', () => {
    test.only('+ Unsplash.fetch | should return success true', async () => {
        const result = await Unsplash.fetch();

        expect(result.success).toBe(true);
    });
    test('+ Unsplash.remove | should return success true', async () => {
        const result = await Unsplash.delete();

        expect(result.success).toBe(true);
    });
    test('+ Unsplash.get | should return success true', async () => {
        const result = await Unsplash.get();
        
        expect('url' in result).toBe(true);
    });
});