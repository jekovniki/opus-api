import { IUnsplashImage } from "../interfaces/IUtils";
import { Unsplash } from "../utils/unsplash";

export async function fetchBackgroundImage(_request: any, response: any): Promise<void> {
    try {
        const data = await Unsplash.get();
    } catch(error) {
        console.log(error);
        response.json({ success: false});
    }
    
}