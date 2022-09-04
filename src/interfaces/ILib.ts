export interface ServerConfiguration {
    port: string | undefined;
    server: any;
}

export type TRestConfiguration = {
    headers?: any;
}

export interface Fetch {
    get(url: string, configuration: TRestConfiguration): Promise<any>;
    post(url: string, configuration: TRestConfiguration, data: any): Promise<any>;
}