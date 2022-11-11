import { Sentry } from "./sentry";

class Logger {
    public info(message: any) {
        Sentry.info(message);
    }

    public warning(message: any) {
        Sentry.event(message);
    }

    public error(message: any) {
        Sentry.error(message)
    }
}

export default new Logger;