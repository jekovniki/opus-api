import logger from "../utils/logger";
import { Unsplash } from "../utils/unsplash";

export async function fetchBackgroundImage(_request: any, response: any): Promise<void> {
    try {
        const data = await Unsplash.get();
    } catch(error) {
        logger.error(error);
        response.json({ success: false});
    }
    
}