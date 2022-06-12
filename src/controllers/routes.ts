import dotenv from 'dotenv';
import { RestServer } from '../lib/rest';
import { postSignIn } from './post';
import bodyParser from 'body-parser';
import { fetchBackgroundImage } from './get';

dotenv.config();

const REST_PATH = process.env.REST_PATH;

export function setRoutes(rest: RestServer): void {
    const server = rest.getServer();
    const cors = require('cors');
    
    server.use(bodyParser.json());
    server.use(cors());

    server.get(`${REST_PATH}/health-check`, healthCheck);
    server.get(`${REST_PATH}/getBackgroundImage`, fetchBackgroundImage);

    server.post(`${REST_PATH}/UCITSsignIn`, postSignIn);
}

export function healthCheck(_request: Record<string, any>, response: Record<string, any>): void {
    response.send({
        status: 'online'
    });
}
