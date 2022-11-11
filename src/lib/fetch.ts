import axios from 'axios';
import { Fetch, TRestConfiguration } from '../interfaces/ILib';
import logger from '../utils/logger';

class APIRequest implements Fetch {

    public async get(url: string, configuration: TRestConfiguration = {}): Promise<any> {
        try {
            const request = axios.create(configuration);
            const response = await request.get(url);
            
            return response;
        } catch(error) {
            logger.error(error, { url, configuration });
        }

    }

    public async post(url: string, configuration: TRestConfiguration = {}, data: any ={}): Promise<any> {
        try {
            const request = axios.create(configuration);

            return await request.post(url, data);
        } catch(error) {
            logger.error(error, { url, configuration, data });
        }
    }
}

export default new APIRequest;