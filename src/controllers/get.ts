import logger from "../utils/logger";
import { Unsplash } from "../service/external/unsplash";

export async function fetchBackgroundImage(_request: any, response: any): Promise<void> {
    try {
        const data = await Unsplash.get();

        response.json(data);
    } catch(error) {
        logger.error(error);
        response.json({ success: false});
    }
    
}