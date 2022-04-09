import * as DAL from "../dal/assets";
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
        console.error('SERVICE: addBSEAssets', error);
    }
    
}