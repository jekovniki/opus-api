import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';

export class SentryConfiguration {

    public static connect() {

        Sentry.init({
            dsn: "https://d6623ac6d984468e8a213ae2c7b0f570@o1166172.ingest.sentry.io/6256485",
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
}