export type TManagementCompany = {
    name: string;
    uic: string;
    legalForm: string;
    firmCase: string | null;
    headquarters: string;
    activity: string;
    representative: string;
    methodOfRepresentation: string;
    boardOfDirectors: string;
    companyCapital: string;
    sharesType: string;
    paidInCapital: string;
    procurator: string | null;
    actualOwnerCompany: string | null;
    actualOwnerPerson: string | null;
}