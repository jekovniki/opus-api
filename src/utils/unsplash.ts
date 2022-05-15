import axios from "axios";
import { IUnsplashImage, Response } from "../interfaces/IUtils";
import { currentSeason } from "./helper";
import * as DalUnsplash from '../dal/utils/unsplash';

class UnsplashImages {

    async fetch(): Promise<Response> {
        try {
            const accessKey = "8F_4kR9pvaS1pOBIdAaBQ6zLeEjhbH0X2z4mBUGf3AE";
            const seasonOfTheYear = currentSeason();
            const response = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${accessKey}&query=${seasonOfTheYear}&orientation=landscape`);
            
            if(!response.data.urls.full) {
                throw { error: 'Fetching image from unsplash was unsuccessful' }
            }

            const imageData: IUnsplashImage = {
                url: response.data.urls.full,
                photographer: response.data.user.name,
                city: response.data.location.city,
                country: response.data.location.country
            };
            await DalUnsplash.addUnsplashImage(imageData);
        
            return { success: true };
        } catch (error) {
            console.log('UnsplashImages.fetch(): ',error);
            
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

    async get(): Promise<IUnsplashImage | Response> {
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

export const Unsplash = new UnsplashImages();
