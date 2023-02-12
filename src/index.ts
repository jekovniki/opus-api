import { Sentry } from './utils/sentry';
import express from 'express';
import dotenv from 'dotenv';
import { RestServer } from './lib/rest';
import { setRoutes } from './controllers/routes';
import { Database } from './lib/database';
import mysql from 'mysql2';
import { fetchUnsplashImages } from './service/external/unsplash';
import { getCommercialData } from './service/external/commercial-register';

dotenv.config();

Sentry.connect();

const port = process.env.REST_PORT ?? '3012';
const server = express();

export const databaseConfiguration = {
    host: '127.0.0.1',
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`
};

export const database = new Database(mysql.createConnection(databaseConfiguration))
export const rest = new RestServer({ port, server });

async function main() {
    database.connect();
    database.createTables();
    
    fetchUnsplashImages()
    const informaciq = await getCommercialData("131422901");
    console.log(informaciq);

    if (process.env.NODE_ENV !== 'test') {
        rest.start();
        setRoutes(rest);
    }
}

main();