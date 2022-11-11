import * as SentryConfig from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import dotenv from 'dotenv';

dotenv.config();
export class Sentry {

    public static connect() {

        SentryConfig.init({
            dsn: process.env.SENTRY_DSN,
            integrations: [
                new RewriteFrames({
                    root: process.cwd(),
                }),
            ],
          
            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0,
          });
    }

    public static error(error: any) {
        SentryConfig.captureException(error);
    }

    public static info(info: any) {
        SentryConfig.captureMessage(info);
    }

    public static event(info: any) {
        SentryConfig.captureEvent(info);
    }
}