export interface IBSEAsset {
    asset: IAssetPrice,
    marketData: Record<string, any>,
    marketSession: Record<string, any>
}

export interface IAssetPrice {
    price: string,
    change: string
}
