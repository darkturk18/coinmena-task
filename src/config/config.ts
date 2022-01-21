import Credentials from "../types/credentials";

const credentials: Credentials = {
    username: 'coinmena',
    password: 'coinmena'
};

const CRYPTO_BASE_URL: string = 'https://data.messari.io/api/v2';
const CRYPTO_CONFIG: object = {
    headers: {
        "x-messari-api-key": "f23afbc8-69ba-4a57-9980-644a4a4e21ba"
    }
};


// Coin API keys (it allows 100 requests only for free plan)
// 77EE58F4-D8FE-4CE7-ACB2-EC94CDC742C5
// 7F5C26EC-8497-4269-BBD7-B1AE279FC3A1
const EXCHANGE_BASE_URL: string = 'https://rest.coinapi.io';
const EXCHANGE_CONFIG: object = {
    headers: {
        "X-CoinAPI-Key": "77EE58F4-D8FE-4CE7-ACB2-EC94CDC742C5"
    }
};

export {
    credentials,
    CRYPTO_BASE_URL,
    CRYPTO_CONFIG,
    EXCHANGE_BASE_URL,
    EXCHANGE_CONFIG
}
