import axios from "axios";
import { UnsplashImage, Response } from "../interfaces/TUtils";
import * as DalUnsplash from '../dal/utils/unsplash';
import { LegalFormEnum } from "../utils/enums";

class CommercialRegister {
    
    constructor() {

    }

    public async fetch(uic: string): Promise<Response> {
        try {
            const response = await axios.get(`https://portal.registryagency.bg/CR/api/Deeds/${uic}`);

            if(response.status !== 200) {
                console.log(`Commercial Register failed to fetch for UIC: ${uic}`);

                return { success: false }
            }

            let data = {
                name: response.data.fullName,
                uic: response.data.uic,
                legalForm: LegalFormEnum[response.data.legalForm],
                firmCase: null,
                headquarters: null,
                activity: null,
                representative: null,
                methodOfRepresentation: null,
                boardOfDirectors: null
            }

            const generalStatus:Array<any> = response.data.sections[0].subDeeds[0].groups[0].fields;

            for(const section of generalStatus) {
                console.log(section);
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
            console.log(data);

            return { success: true };
        } catch (error) {
            console.log('CommercialRegister.fetch() encountered unexpected error: ', error);

            return { success: false }
        }
    }

    async delete(): Promise<Response> {
        try {
            await DalUnsplash.removeUnsplashImage();

            return { success: true }
        } catch(error) {
            console.log('UnsplashImages.delete(): ', error);

            return { success: false }
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
            console.log('UnsplashImage.get(): ', error);

            return { success: false }
        }
    }
}

export const CommercialRegisterActions = new CommercialRegister();

export async function getCommercialData() {
    
   const result =  await CommercialRegisterActions.fetch('175263888');
   console.log(result);
}