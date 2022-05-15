export type IBSEAsset = {
    asset: IAssetPrice,
    marketData: Record<string, any>,
    marketSession: Record<string, any>
}

export type IAssetPrice = {
    price: string,
    change: string
}
