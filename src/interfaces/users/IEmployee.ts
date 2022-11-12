export interface Credentials {
    email: string,
    password?: string,
    managementCompany: string,
    deviceLogin?: string,
}

export interface EmployeeData extends Credentials {
    firstName: string,
    lastName: string,
    companyRole: string,
    birthDate: string,
    accessLevel?: number,
    isRepresentative: boolean,
}