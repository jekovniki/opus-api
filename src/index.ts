import { SentryConfiguration } from './utils/sentry';
import dotenv from 'dotenv';
import * as _rest from './lib/rest';
import * as _router from './controllers/routes';
import * as _database from './lib/database';
import { fetchUnsplashImages } from './utils/unsplash';

dotenv.config();

// SentryConfiguration.connect();

export const database = new _database.MySQLDatabase({
    host: '127.0.0.1',
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`
});

export const rest = new _rest.RestServer({
    port: process.env.REST_PORT
})

async function main() {
    _database.connect(database);
    _database.load();
    
    fetchUnsplashImages()

    if (process.env.NODE_ENV !== 'test') {
        _rest.useBodyParser(rest);
        _rest.start(rest);
        _router.setRoutes(rest);
    }

}

main();