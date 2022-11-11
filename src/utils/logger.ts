import { LogResponse } from "../interfaces/TUtils";
import { Sentry } from "./sentry";

class Logger {
    public info(message: any, request: Record<string, any> = {}): LogResponse {
        console.info(message);
        Sentry.info(message);

        return {
            ...request,
            success: true
        }
    }

    public warning(message: any, request: Record<string, any> = {}): LogResponse {
        console.warn(message);
        Sentry.event(message);

        return {
            ...request,
            success: true
        }
    }

    public error(message: any, request: Record<string, any> = {}): LogResponse {
        console.error(message);
        Sentry.error(message)

        return {
            ...request,
            success: false
        }
    }
}

export default new Logger;