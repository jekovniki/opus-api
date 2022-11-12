import dotenv from 'dotenv';
import { database } from '../index';
import { EmployeeData } from '../interfaces/users/IEmployee';

dotenv.config();

const dbName = process.env.DB_NAME;

export async function registerEmployee(employee: EmployeeData): Promise<EmployeeData> {
    const result = await database.query(`
        INSERT INTO ${dbName}.Users (
            email, password, first_name, last_name, company, company_role, is_representative, birth_date, access_level, device_login
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            employee.email, 
            employee.password, 
            employee.firstName, 
            employee.lastName, 
            employee.managementCompany,
            employee.companyRole,
            employee.isRepresentative,
            employee.birthDate, 
            employee.accessLevel, 
            employee.deviceLogin
            ]
        );

    if (!result.insertId && result.affectedRows != 1) {
        throw new Error("Unsuccsessfull user registration");
    }
        
    return employee;
}