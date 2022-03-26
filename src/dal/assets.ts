import dotenv from 'dotenv';
import { database } from '..';

dotenv.config();

export async function addAssetsBSE(asset: object): Promise<any> {
    const result = await database.query(`
        INSERT INTO ${process.env.DB_NAME}.BSE_Assets
        (Type, Code, Name, CFI, LEI, FISN, Volume, Nominal, Currency)
        VALUES (?)
    `, [asset]);

    console.log(result);
    
}