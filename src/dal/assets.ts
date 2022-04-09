import dotenv from 'dotenv';
import { database } from '../index';
import { BSEAssetType } from '../interfaces/IBulgarianStockExchange';

dotenv.config();

export async function addAssetsBSE(asset: BSEAssetType): Promise<void> {
    await database.query(`
        INSERT INTO ${process.env.DB_NAME}.bse_assets (type, code, name, CFI, LEI, FISN, Volume, Nominal, Currency)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [asset.type, asset.code, asset.name, asset.CFI, asset.LEI, asset.FISN, asset.Volume, asset.Nominal, asset.Currency]);
}