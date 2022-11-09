import { useMoralis } from 'react-moralis';
import NFTBox from '../components/NFTBox';
import networkMapping from '../constants/networkMapping.json';
import GET_ACTIVE_ITEMS from '../constants/subgraphQueries';
import { useQuery } from '@apollo/client';
import { Card, Illustration } from 'web3uikit';

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : '31337';
  const marketplaceAddress = networkMapping[chainString].NftMarketplace[0];

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

  console.log({ listedNfts });
  const imageURI =
    'https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-electric-socket-and-plug-disconnect-png-image_4684939.png';

  return (
    <div className="container mx-auto">
      {isWeb3Enabled && (
        <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      )}

      <div
        className="flex flex-wrap"
        style={{
          justifyContent: 'center',
        }}
      >
        {isWeb3Enabled ? (
          loading || !listedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.activeItems.map((nft) => {
              console.log(nft);
              const { price, nftAddress, tokenId, seller } = nft;
              return (
                <NFTBox
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  marketplaceAddress={marketplaceAddress}
                  seller={seller}
                  key={`${nftAddress}${tokenId}`}
                />
              );
            })
          )
        ) : (
          <div
            style={{
              width: '500px',
              marginTop: '10%',
            }}
          >
            <Card
              description="We do not own private keys and cannot access your funds without your confirmation"
              onClick={function noRefCheck() {}}
              setIsSelected={function noRefCheck() {}}
              title="Connect Your Wallet"
              tooltipText="Connect with one of available wallet providers or create a new wallet"
            >
              <div>
                <Illustration height="230px" logo="bundle" width="100%" />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
