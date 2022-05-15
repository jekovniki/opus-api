import dotenv from 'dotenv';
import { IUnsplashImage } from '../../interfaces/IUtils';
import { database } from '../../index';

dotenv.config();

export async function addUnsplashImage(data: IUnsplashImage): Promise<void> {
    await database.query(`
        INSERT INTO ${process.env.DB_NAME}.unsplash (url, photographer, country, city)
        VALUES (?, ?, ?, ?)
    `, [data.url, data.photographer, data.country, data.city]);
}

export async function removeUnsplashImage(): Promise<void> {
    await database.query(
        `DELETE FROM ${process.env.DB_NAME}.unsplash
        ORDER BY created_at ASC
        LIMIT 50`
    );
}

export async function getUnsplashImage(): Promise<IUnsplashImage[]> {
    return await database.query(`
        SELECT *
        FROM ${process.env.DB_NAME}.unsplash
        ORDER BY RAND()
        LIMIT 1
    `);
}