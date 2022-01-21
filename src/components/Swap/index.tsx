import { useState, useEffect, ChangeEvent } from 'react';
import { Menu } from '@headlessui/react';

import { useCryptoAssets } from '../../hooks/useCryptoAssets';
import { useExchangeRate } from '../../hooks/useExchangeRate';
import { useStore } from '../../store/login';

import { CryptoAsset } from '../../types/cryptoAsset';

import SwapIcon from '../../assets/images/switch.png';

export default function Swap() {
  const [assets = []] = useCryptoAssets();
  const [exchangeRate, isLoading, setExchangeAssets] = useExchangeRate();
  const { loggedIn } = useStore();

  const [selectedAsset, setSelectedAsset] = useState('');
  const [isSwapped, setIsSwapped] = useState(false);
  const [exchangeAmounts, setExchangeAmounts] = useState({
    usd: 0,
    crypto: 0,
  });

  useEffect(() => {
    if (selectedAsset) {
      isSwapped ? setExchangeAssets(`USD/${selectedAsset}`) :
                  setExchangeAssets(`${selectedAsset}/USD`);
    }
  }, [isSwapped, selectedAsset, setExchangeAssets]);

  useEffect(() => {
    if (!exchangeRate) {
      return;
    }

    if (!isSwapped) {
      setExchangeAmounts({
        ...exchangeAmounts,
        usd: (exchangeAmounts.crypto * exchangeRate?.rate)
      });
    } else {
      setExchangeAmounts({
        ...exchangeAmounts,
        crypto: (exchangeAmounts.usd * exchangeRate?.rate)
      });
    }
  // Disabling eslint here, no need to watch exchangeAmounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRate, isSwapped, exchangeAmounts.crypto, exchangeAmounts.usd]);


  /**
   * Handles exchange rates form fields changes
   * @param e HTML element change event
   */
  const handleExchangeRatesFields = (e: ChangeEvent<HTMLInputElement>): void => {
    setExchangeAmounts({
      ...exchangeAmounts,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="swap-wrapper">
      <div className={`${isSwapped ? 'swapped ' : ''}swap-container`}>
        {
          !loggedIn && <small>You need to login in order to use this feature!</small>
        }
        <div className="swap-field">
          <input
            type="text"
            autoComplete="off"
            inputMode="decimal"
            minLength={1}
            placeholder="0.0"
            onChange={(e) => handleExchangeRatesFields(e)}
            value={exchangeAmounts.crypto ? exchangeAmounts.crypto : ''}
            readOnly={isSwapped}
            disabled={!loggedIn}
            id="crypto"
          />
          <div className="crypto-asset">
            <Menu>
              <Menu.Button>{selectedAsset ? selectedAsset : 'Select Asset'}</Menu.Button>
              <Menu.Items className="dropdown-items">
                {
                  assets.map((asset: CryptoAsset) => (
                    <Menu.Item key={asset.id}>
                      <div onClick={() => setSelectedAsset(asset.symbol || '')} className="menu-item">
                        <img
                          src={`https://messari.io/asset-images/${asset.id}/32.png?v=2`}
                          alt="asset icon"
                        />
                        <span>{asset.symbol}</span>
                      </div>
                    </Menu.Item>
                  ))
                }
              </Menu.Items>
            </Menu>
          </div>
        </div>
        {
          loggedIn &&
            <img
              onClick={() => setIsSwapped(!isSwapped)}
              className="swap-icon"
              src={SwapIcon}
              alt="swap icon"
            />
        }
        <div className="swap-field">
          <input
            className={`${isLoading ? 'animated-background' : ''}`}
            type="text"
            autoComplete="off"
            inputMode="decimal"
            minLength={1}
            placeholder="0.0"
            onChange={(e) => handleExchangeRatesFields(e)}
            value={exchangeAmounts.usd ? exchangeAmounts.usd : ''}
            readOnly={!isSwapped}
            disabled={!loggedIn}
            id="usd"
          />
          <span className="usd-label">USD</span>
        </div>
      </div>
    </div>
  );
}
