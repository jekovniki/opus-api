import { SentryConfiguration } from './utils/sentry';
import dotenv from 'dotenv';
import * as _rest from './lib/rest';
import * as _router from './controllers/routes';
import * as _database from './lib/database';
import * as mysql from 'mysql';

dotenv.config();

SentryConfiguration.connect();

// export const database = new _database.MySQLDatabase({
//     host: '127.0.0.1',
//     port: Number(process.env.DB_PORT),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     multipleStatements: true
// })

const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export const rest = new _rest.RestServer({
    port: process.env.REST_PORT
})

// database.connect();

// _database.connect(database);

// console.log('Database, connected');


if (process.env.NODE_ENV !== 'test') {
    _rest.useBodyParser(rest);
    _rest.start(rest);
    _router.setRoutes(rest);
}