interface ServerConfiguration {
    port: string | undefined;
    server: any;
}

export class RestServer {
    private server: any;
    private port: string | undefined;

    constructor(configuration: ServerConfiguration) {
        this.port = configuration.port;
        this.server = configuration.server;
    }

    public getServer(): any {
        return this.server;
    }

    public getPort(): string | undefined {
        return this.port;
    }

    public close(): void {
        this.server.listen(this.port, () => {
            this.server.close();
        });
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Sever listening on: localhost: ${this.port}`)
        })
    }
}
