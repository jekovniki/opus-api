import bcrypt from 'bcrypt';

import { registerEmployee } from "../dal/users";
import { LogResponse } from '../interfaces/TUtils';
import { EmployeeData } from "../interfaces/users/IEmployee";
import { IEntities } from "../interfaces/users/IEntities";
import { hashPassword, validateObject } from '../utils/helper';
import logger from "../utils/logger";

export class Entities {
    private name;
    private email;
    private firstName;
    private lastName;
    private password;
    private managementCompany;
    private companyRole;
    private deviceLogin;
    private birthDate;
    private accessLevel;
    private bulstat;
    private address;
    private managementCeo;
    private managementOther;
    private navForShare;
    private nav;
    private numberOfShares;
    private yieldFromBeginningOfYear;
    private yieldForLastTwelveMonths;
    private standardDeviation;
    private uic;
    private type;
    private representatives;
    private boardOfDirectors;
    private capital;
    private paidCapital;
    private procura;
    private procurator;
    private procuratorRepresentation;
    private beneficialOwners;
    private deviceType;

    constructor(information: IEntities = {} ) {
        this.name = information.name;
        this.email = information.email;
        this.firstName = information.firstName;
        this.lastName = information.lastName;
        this.password = information.password;
        this.managementCompany = information.managementCompany;
        this.companyRole = information.companyRole;
        this.deviceLogin = information.deviceLogin;
        this.birthDate = information.birthDate;
        this.accessLevel = information.accessLevel;
        this.bulstat = information.bulstat;
        this.address = information.address;
        this.managementCeo = information.managementCeo;
        this.managementOther = information.managementCompany;
        this.navForShare = information.navForShare;
        this.nav = information.nav;
        this.numberOfShares = information.numberOfShares;
        this.yieldFromBeginningOfYear = information.yieldFromBeginningOfYear;
        this.yieldForLastTwelveMonths = information.yieldForLastTwelveMonths;
        this.standardDeviation = information.standardDeviation;
        this.uic = information.uic;
        this.type = information.type;
        this.representatives = information.representatives;
        this.boardOfDirectors = information.boardOfDirectors;
        this.capital = information.capital;
        this.paidCapital = information.paidCapital;
        this.procura = information.procura;
        this.procurator = information.procurator;
        this.procuratorRepresentation = information.procuratorRepresentation;
        this.beneficialOwners = information.beneficialOwners;
        this.deviceType = information.deviceType;
    }

    public async registerEmployee(): Promise<EmployeeData | LogResponse> {
        try {
            const employee: EmployeeData = validateObject({
                email: this.email,
                password: await this.validatePassword(this.password),
                firstName: this.firstName,
                lastName: this.lastName,
                companyRole: this.companyRole,
                birthDate: this.birthDate,
                accessLevel: this.accessLevel,
                isRepresentative: false, // Do something with this
                managementCompany: this.managementCompany,
                deviceLogin: this.deviceLogin
            });

            const registeredData = await registerEmployee(employee);

            return {
                email: registeredData.email,
                firstName: registeredData.firstName,
                lastName: registeredData.lastName,
                companyRole: registeredData.companyRole,
                birthDate: registeredData.birthDate,
                isRepresentative: registeredData.isRepresentative,
                managementCompany: registeredData.managementCompany
            };

        } catch (error: any) {
            return logger.error(error, {code: error.code, message: error.sqlMessage ?? error.message});
        }
    }

    private async validatePassword(password: string | undefined): Promise<string> {
        if (typeof password === 'undefined') {
            throw new Error('Missing password');
        }

        if (password.length <= 6) {
            throw new Error('Password too short');
        }
        
        return await hashPassword(password);
    }
}