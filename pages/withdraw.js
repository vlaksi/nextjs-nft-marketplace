import styles from '../styles/Home.module.css';
import { useNotification, CryptoCards, ExternalLink } from 'web3uikit';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import nftMarketplaceAbi from '../constants/NftMarketplace.json';
import networkMapping from '../constants/networkMapping.json';
import { useEffect, useState } from 'react';
import NotConnectedWallet from '../components/NotConnectedWallet';
import { ethers } from 'ethers';

export default function Home() {
  const { chainId, account, isWeb3Enabled } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : '31337';
  const marketplaceAddress = networkMapping[chainString].NftMarketplace[0];
  const dispatch = useNotification();
  const [proceeds, setProceeds] = useState('0');

  const { runContractFunction } = useWeb3Contract();

  const handleWithdrawSuccess = () => {
    dispatch({
      type: 'success',
      message: 'Withdrawing proceeds',
      position: 'topR',
    });
  };

  async function setupUI() {
    const returnedProceeds = await runContractFunction({
      params: {
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: 'getProceeds',
        params: {
          seller: account,
        },
      },
      onError: (error) => console.log(error),
    });
    if (returnedProceeds) {
      setProceeds(returnedProceeds.toString());
    }
  }

  useEffect(() => {
    setupUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proceeds, account, isWeb3Enabled, chainId]);

  return (
    <div
      className={styles.container}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* PROCEEDS */}
      {isWeb3Enabled ? (
        <>
          <CryptoCards
            bgColor="#396993"
            btnText="Withdraw"
            chain="Balance"
            // chainType={proceeds}
            chainType={`${ethers.utils.formatEther(proceeds).toString()} ETH`}
            settingsIcon={<ExternalLink fontSize="20px" />}
            onClick={() => {
              if (proceeds == '0') return;
              runContractFunction({
                params: {
                  abi: nftMarketplaceAbi,
                  contractAddress: marketplaceAddress,
                  functionName: 'withdrawProceeds',
                  params: {},
                },
                onError: (error) => console.log(error),
                onSuccess: () => handleWithdrawSuccess,
              });
            }}
          />
        </>
      ) : (
        <NotConnectedWallet />
      )}
    </div>
  );
}
