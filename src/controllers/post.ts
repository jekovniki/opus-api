import { Entities } from "../service/entities";
import logger from "../utils/logger";

export async function postSignIn(request: Record<string, any>, response: Record<string, any>): Promise<void> {
    try {
        console.log(response);

        response.json(response);

    } catch(error) {
        console.error(error);
        response.json({
            success: false
        })
    }
}

export async function registerEmployee(request: any, response: any): Promise<void> {
    try {
        console.log(request.body);
        
        const register = await new Entities(request.body).registerEmployee();
        
        response.json(register);
    } catch(error) {
        logger.error(error);
        response.json({
            success: false
        });
    }
}