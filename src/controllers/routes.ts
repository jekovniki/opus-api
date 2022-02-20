import dotenv from 'dotenv';
import path from 'path';
import { RestServer } from '../lib/rest';

dotenv.config();

const REST_PATH = process.env.REST_PATH;

export function setRoutes(rest: RestServer): void {
    const server = rest.getServer();

    server.get(`${REST_PATH}/health-check`, healthCheck);
}

export function healthCheck(_request: Record<string, any>, response: Record<string, any>): void {
    response.json({
        status: 'online'
    })
}
