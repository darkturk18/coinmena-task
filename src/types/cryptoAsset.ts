export interface CryptoAsset {
    id: string;
    name: string;
    metrics: Metrics;
    symbol?: string;
}

export interface CryptoAssetResponse {
    data: {
        data: CryptoAsset
    };
}

export interface Metrics {
    market_data: MarketData;
}

export default interface MarketData {
    price_usd: number;
}
