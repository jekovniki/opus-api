import dotenv from 'dotenv';
import * as _rest from './lib/rest';
import * as _router from './controllers/routes';

dotenv.config();

export const rest = new _rest.RestServer({
    port: process.env.REST_PORT
})

if (process.env.NODE_ENV !== 'test') {
    _rest.useBodyParser(rest);
    _rest.start(rest);
    _router.setRoutes(rest);
}