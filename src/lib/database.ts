import mysql from 'mysql2';

export class MySQLDatabase {
    private connection: mysql.Connection;

    constructor(configuration: any) {
        this.connection = mysql.createConnection(configuration);
    }

    public getConnection(): mysql.Connection {
        return this.connection;
    }

    public async connect(): Promise<void> {
        this.connection.connect((error) => {
            if (error) {
                throw error;
            }
        });
    }

    public async end(): Promise<void> {
        this.connection.end((error) => {
            if (error) {
                throw error;
            }
        })
    }
    public query(queryString: string, parameters: any = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(queryString, parameters, (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                resolve(result);
            });
        });
    }
}

export async function connect(database: MySQLDatabase): Promise<MySQLDatabase> {
    await database.connect();

    return database;
}