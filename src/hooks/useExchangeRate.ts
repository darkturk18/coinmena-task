import { useState } from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';

import { EXCHANGE_BASE_URL, EXCHANGE_CONFIG } from '../config/config';

const exchangeRate = (params: any): Promise<AxiosResponse> => {
    const { exchangeAssets } = params.queryKey[0];
    return axios.get(`${EXCHANGE_BASE_URL}/v1/exchangerate/${exchangeAssets}`, EXCHANGE_CONFIG);
};

export const useExchangeRate = (): any => {
    const [exchangeAssets, setExchangeAssets] = useState('');

    const { data, isLoading } = useQuery(
        [{ exchangeAssets }], (params: QueryFunctionContext) => {
            if (exchangeAssets) {
                return exchangeRate(params)
            }
        },
        {
            select: (data: any) => data.data,
        }
    );

    return [data, isLoading, setExchangeAssets];
};
