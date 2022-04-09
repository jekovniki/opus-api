import dotenv from 'dotenv';
import { database } from '../index';

dotenv.config();

export async function addAssetsBSE(assets: any): Promise<any> {
    console.log(assets);
    
    const result: any = await database.query(`
        INSERT INTO ${process.env.DB_NAME}.BSE_Assets (Type, Code, Name, CFI, LEI, FISN, Volume, Nominal, Currency)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [assets], (error: any, response: any) => {
        if (error) {
            console.log(error);
        }
        console.log(response);
        
    });

    console.log(result);
    
}