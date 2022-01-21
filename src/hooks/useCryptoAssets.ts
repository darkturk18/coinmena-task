import { useState } from 'react';
import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';

import { CRYPTO_BASE_URL, CRYPTO_CONFIG } from '../config/config';

import { CryptoAssetResponse } from '../types/cryptoAsset';

const fetchAssets = (params: any): Promise<AxiosResponse> => {
    const { limit } = params.queryKey[0];
    return axios.get(`${CRYPTO_BASE_URL}/assets?limit=${limit}`, CRYPTO_CONFIG);
};

export const useCryptoAssets = (): any => {
    const [limit, setLimit] = useState(10);

    const { data, isLoading } = useQuery([{ limit }], (params) => fetchAssets(params), {
        select: (data: CryptoAssetResponse) => {
            return data.data.data
        },
        refetchOnMount: false,
        keepPreviousData: true
    })

    return [data, limit, isLoading, setLimit];
};
