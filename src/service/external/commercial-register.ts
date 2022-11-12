import APIRequest from '../../lib/fetch';
import { UnsplashImage, Response } from "../../interfaces/TUtils";
import * as DalUnsplash from '../../dal/unsplash';
import { LegalFormEnum } from "../../utils/enums";
import { TManagementCompany } from "../../interfaces/TCommercialRegister";
import logger from '../../utils/logger';

class CommercialRegister {
    
    constructor() {

    }

    public async fetch(uic: string): Promise<TManagementCompany | Response> {
        try {
            const response = await APIRequest.get(`https://portal.registryagency.bg/CR/api/Deeds/${uic}`);
            if(response.status !== 200) {
                throw new Error(`Commercial Register failed to fetch for UIC: ${uic}`);
            }

            let data: any = {
                name: response.data.fullName,
                uic: response.data.uic,
                legalForm: LegalFormEnum[response.data.legalForm],
            }

            const generalStatus:Array<any> = response.data.sections[0].subDeeds[0].groups[0]?.fields;
            const generalStatusFund: Array<any> = response.data.sections[0].subDeeds[0].groups[1]?.fields;
            const procura = response.data.sections[3].subDeeds[0].groups[0]?.fields[0];
            const actualOwner: Array<any> = response.data.sections[4].subDeeds[0].groups[2]?.fields;

            for(const section of generalStatus) {
                if (section.nameCode === 'CR_F_1_L') {
                    data.firmCase = section.htmlData.split(`${uic}<br/>`).pop().split(`</p>`).shift();
                }
                if (section.nameCode === 'CR_F_5_L') {
                    data.headquarters = section.htmlData.replace(/(<([^>]+)>)/gi, "");
                }
                if (section.nameCode === 'CR_F_6_L') {
                    data.activity = section.htmlData.split(`-text'>`).pop().split('</').shift();
                }
                if (section.nameCode === 'CR_F_10_L') {
                    data.representative = section.htmlData.split(`-text'>`).pop().split('</').shift();
                }
                if (section.nameCode === 'CR_F_11_L') {
                    data.methodOfRepresentation = section.htmlData.split(`<br />`).pop().split('</').shift();
                }
                if (section.nameCode === 'CR_F_12_L') {
                    data.boardOfDirectors = section.htmlData.replace(/(<([^>]+)>)/gi, "");
                }
            }

            for(const section of generalStatusFund) {
                if(section.nameCode === 'CR_F_31_L') {
                    data.companyCapital = section.htmlData.split(`-text'>`).pop().split('</').shift();
                }
                if(section.nameCode === 'CR_F_31a_L') {
                    data.sharesType = section.htmlData.split(`<br/>`).pop().split('</').shift();
                }
                if(section.nameCode === 'CR_F_32_L') {
                    data.paidInCapital = section.htmlData.split(`-text'>`).pop().split('</').shift();
                }
            }

            data.procurator = procura.htmlData.split(`-text'>`).pop().split('<br/').shift();

            if (actualOwner) {
                for(const section of actualOwner) {
                    if(section.nameCode === 'CR_F_537_L') {
                        data.actualOwnerCompany = section.htmlData.replace(/(<([^>]+)>)/gi, "");
                    }
                    if(section.nameCode === 'CR_F_5371_L') {
                        data.actualOwnerPerson = section.htmlData.replace(/(<([^>]+)>)/gi, "");
                    }
                }
            }

            return data;
        } catch (error) {

            return logger.error(error);
        }
    }

    async delete(): Promise<Response> {
        try {
            await DalUnsplash.removeUnsplashImage();

            return { success: true }
        } catch(error) {

            return logger.error(error);
        }
    }

    async get(): Promise<UnsplashImage | Response> {
        try {
            const image = await DalUnsplash.getUnsplashImage();
            if (image.length === 0) {
                throw { error: 'No images in database' }
            }

            return image[0];
        } catch(error) {

            return logger.error(error);

        }
    }
}

export const CommercialRegisterActions = new CommercialRegister();

export async function getCommercialData(UIC: string) {
    
   const result =  await CommercialRegisterActions.fetch(UIC);
   
   return result;
}