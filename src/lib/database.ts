import mysql from 'mysql';

export class MySQLDatabase {
    private connection: mysql.Connection;

    constructor(configuration: mysql.ConnectionConfig) {
        this.connection = mysql.createConnection(configuration);
    }

    public getConnection(): mysql.Connection {
        return this.connection;
    }

    public connect(): void {
        this.connection.connect((error) => {
            if (error) {
                throw error;
            }
        });
    }

    public end(): void {
        this.connection.end((error) => {
            if (error) {
                throw error;
            }
        })
    }
}

export function connect(database: MySQLDatabase): MySQLDatabase {
    database.connect();

    return database;
}