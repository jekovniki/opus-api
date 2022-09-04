import axios from 'axios';
import { Fetch, TRestConfiguration } from '../interfaces/ILib';

class APIRequest implements Fetch {

    public async get(url: string, configuration: TRestConfiguration = {}): Promise<any> {
        try {
            const request = axios.create(configuration);
            const response = await request.get(url);
            
            return response;
        } catch(error) {
            console.log(error);
        }

    }

    public async post(url: string, configuration: TRestConfiguration = {}, data: any ={}): Promise<any> {
        try {
            const request = axios.create(configuration);

            return await request.post(url, data);
        } catch(error) {
            console.log(error);
        }
    }
}

export default new APIRequest;