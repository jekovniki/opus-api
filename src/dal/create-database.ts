import dotenv from 'dotenv';
import { database } from '../index';

dotenv.config();

const dbName = process.env.DB_NAME;

export async function createBSEAssetsTable() {
    return database.query(
        `CREATE TABLE if not exists ${dbName}.BSE_Assets(
            Type VARCHAR(100) NOT NULL,
            Code VARCHAR(100) NOT NULL,
            Name VARCHAR(100) NOT NULL,
            CFI VARCHAR(100) NOT NULL,
            LEI VARCHAR(100) NOT NULL,
            FISN VARCHAR(100) NOT NULL,
            Volume VARCHAR(100) NOT NULL,
            Nominal VARCHAR(100) NOT NULL,
            Currency VARCHAR(100) NOT NULL,
            primary key (Code)
        )`
    );
}

export async function createCompaniesTable() {
    return database.query(
        `CREATE TABLE if not exists ${dbName}.Companies(
            id INT NOT NULL AUTO_INCREMENT,
            uic VARCHAR(100) NOT NULL,
            lei VARCHAR(100) NOT NULL,
            name VARCHAR(100) NOT NULL,
            representatives VARCHAR(100) NOT NULL,
            board_of_directors VARCHAR(100) NOT NULL,
            capital_amount VARCHAR(100) NOT NULL,
            primary key (id)
        )`
    );
}

export async function createUsersTable() {
    return database.query(
        `CREATE TABLE if not exists ${dbName}.Users(
            id INT NOT NULL AUTO_INCREMENT,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            company VARCHAR(100) NOT NULL,
            company_role VARCHAR(100) NOT NULL,
            is_representative BOOL DEFAULT 0,
            birth_date VARCHAR(255) NOT NULL,
            device_login VARCHAR(255) NOT NULL,
            access_level INT,
            primary key (id)
        )`
    );
}

export async function createLandingPageImageTable() {
    return database.query(
        `CREATE TABLE if not exists ${dbName}.unsplash(
        id INT NOT NULL AUTO_INCREMENT,
        url VARCHAR(255) NOT NULL,
        photographer VARCHAR(255) DEFAULT NULL NULL,
        country VARCHAR(100) DEFAULT NULL NULL,
        city VARCHAR(100) DEFAULT NULL NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        primary key (id))`
    )
}