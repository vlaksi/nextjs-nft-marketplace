import { Card, Illustration } from 'web3uikit';

export default function NotConnectedWallet() {
  return (
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
  );
}
