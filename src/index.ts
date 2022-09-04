import { SentryConfiguration } from './utils/sentry';
import express from 'express';
import dotenv from 'dotenv';
import { RestServer } from './lib/rest';
import * as _router from './controllers/routes';
import * as _database from './lib/database';
import { fetchUnsplashImages } from './utils/unsplash';
import { CommercialRegisterActions, getCommercialData } from './service/CommercialRegister';

dotenv.config();

// SentryConfiguration.connect();

const port = process.env.REST_PORT ?? '3012';
const server = express();

export const database = new _database.MySQLDatabase({
    host: '127.0.0.1',
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`
});

export const rest = new RestServer({ port, server });

async function main() {
    _database.connect(database);
    _database.load();
    
    fetchUnsplashImages()
    await getCommercialData();

    if (process.env.NODE_ENV !== 'test') {
        rest.start();
        _router.setRoutes(rest);
    }

}

main();