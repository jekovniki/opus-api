import { Entities } from '../src/service/entities'

describe('Users services', () => {
    const employee = {
        email: `test${new Date().getTime()}@test.ts`,
        password: "Aa123456!",
        firstName: "Nikolay",
        lastName: "Zhekov",
        companyRole: "normativnoSaotvetstvie",
        birthDate: "16.12.1995",
        accessLevel: 5,
        managementCompany: "EF Asset Management",
        deviceLogin: ""
    }

    test('+ registerUser | should return register user information', async () => {
        const result = await new Entities(employee).registerEmployee();
        
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('password');
        expect(result).toHaveProperty('firstName');
        expect(result).toHaveProperty('lastName');
    });
    test('- registerUser | should return success: false', async () => {
        const result = await new Entities(employee).registerEmployee();
        
        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('code');
    });
    afterAll(async () => {
        
    })
});