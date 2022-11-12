import APIRequest from '../../lib/fetch';
import { UnsplashImage, Response } from "../../interfaces/TUtils";
import { currentSeason } from "../../utils/helper";
import * as DalUnsplash from '../../dal/unsplash';
import logger from '../../utils/logger';

class UnsplashImages {

    async fetch(): Promise<Response> {
        try {
            const accessKey = "8F_4kR9pvaS1pOBIdAaBQ6zLeEjhbH0X2z4mBUGf3AE";
            const seasonOfTheYear = currentSeason();
            const response = await APIRequest.get(`https://api.unsplash.com/photos/random/?client_id=${accessKey}&query=${seasonOfTheYear}&orientation=landscape`);
            
            if(!response.data.urls.full) {
                throw { error: 'Fetching image from unsplash was unsuccessful' }
            }

            const imageData: UnsplashImage = {
                url: response.data.urls.full,
                photographer: response.data.user.name,
                city: response.data.location.city,
                country: response.data.location.country
            };
            await DalUnsplash.addUnsplashImage(imageData);
        
            return { success: true };
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

export async function fetchUnsplashImages(): Promise<void> {
    try {
        const minutes: number = 5;
        const interval: number = minutes * 60 * 1000;
        let numberOfFetchedImages: number = 0;

        setInterval(async () => {
            await Unsplash.fetch();
            console.log('Image fetched from unsplash');

            numberOfFetchedImages++;
            if(numberOfFetchedImages >= 50) {
                await Unsplash.delete();
                console.log('50 images from unsplash were deleted from database');

                numberOfFetchedImages = 0;
            }
        }, interval);
    } catch (error) {
        
        logger.error(error);
    }

}

export const Unsplash = new UnsplashImages();
