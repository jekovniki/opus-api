import * as DAL from "../dal/assets";
import logger from "../utils/logger";
import { BulgarianStockExchange } from "../utils/puppeteer";

export async function addBSEAssets(type: string, page: any, htmlId: string) {
    try {
        const assets = await new BulgarianStockExchange().getListedInstruments(page, htmlId);

        if ('error' in assets) {
            return assets;
        }
        for (const asset of assets) {
            const assetInformation = Object.assign({type: type}, asset);
            
            await DAL.addAssetsBSE(assetInformation as any);
        }

        return true;
    } catch (error) {
        logger.error(error);
    }
    
}