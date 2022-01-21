import { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { useCryptoAssets } from '../../hooks/useCryptoAssets';

import { CryptoAsset } from '../../types/cryptoAsset';

export default function Table() {
    const [data = [], limit, isLoading, setLimit] = useCryptoAssets();

    // In order to show ghost elements while fetching data
    let ghostElements = new Array(10).fill({id: '', name: '', metrics: []});
    const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>(ghostElements);
    const [sortType, setSortType] = useState('');

    /**
     * Sorts crypto assets alphabetically
     * @param data crypto assets data
     */
    const handleAlphaSorting = (data: CryptoAsset[]) => {
        const assets: CryptoAsset[] = [...data];

        assets.sort((prev: CryptoAsset, curr: CryptoAsset) => prev.name > curr.name ? 1 : -1);

        setCryptoAssets(assets);
    };

    /**
     * Sorts crypto assets according to the price descending
     * @param data crypto assets data
     */
    const handlePriceSorting = (data: CryptoAsset[]) => {
        const assets: CryptoAsset[] = [...data];

        assets.sort((prev: CryptoAsset, curr: CryptoAsset) => {
            return  prev.metrics.market_data.price_usd <
                    curr.metrics.market_data.price_usd ? 1 : -1;
        });

        setCryptoAssets(assets);
    };

    useEffect(() => {
        if (data.length) {
            if (!sortType) {
                setCryptoAssets(data);
            } else if (sortType === 'price') {
                handlePriceSorting(data)
            } else {
                handleAlphaSorting(data)
            }
        }
    }, [data, sortType]);

    return (
        <div className="crypto-table__wrapper">
            <div className="container">
                <div className="crypto-table__header">
                    <div className="crypto-item">
                        <span onClick={() => setSortType('alpha')} className="coin-name">Coin Name</span>
                        <span onClick={() => setSortType('price')} className="coin-price">Price</span>
                        <span className="coin-action">Action</span>
                    </div>
                </div>
                <div className="crypto-table__body">
                    {
                        cryptoAssets && (cryptoAssets).map((asset: any, i: number) => (
                            <div key={asset.id || i} className={`${isLoading ? 'animated-background ' : ''} crypto-item`}>
                                <span className="coin-name">
                                    <div
                                        className="coin-logo"
                                        style={{
                                            backgroundImage: `${asset.id && `url(https://messari.io/asset-images/${asset.id}/32.png?v=2)`}`
                                        }}
                                    />
                                    <span>{asset.name}</span>
                                </span>
                                <span className="coin-price">
                                    {!!asset?.metrics?.length && `${asset?.metrics?.market_data?.price_usd.toLocaleString()}$`}
                                </span>
                                <span className="coin-action">
                                    {<Menu>
                                        <Menu.Button>Buy/Sell</Menu.Button>
                                        <Menu.Items className="dropdown-items">
                                            <Menu.Item>
                                                <span>Buy</span>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <span>Sell</span>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <div className="crypto-table__button">
                    <button onClick={() => setLimit(limit + 10)}>
                        More Assets
                    </button>
                </div>
            </div>
        </div>
    )
}
