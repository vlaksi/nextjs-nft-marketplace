import styles from '../styles/Home.module.css';

/**
 * Show the recently listed NFTs
 * @returns
 */
export default function Home() {
  // We will index(add) the events off-chain and then read from our database.
  // Setup a server to listen for those events to be fired, and add them to a database to query

  // Every single time when item is listed (ItemListed event) we will index/add it to our database
  // TheGraph do it on decentralized way.
  // Moralis is doing that on centralized way

  // we read from a databse that has all the mappings 
  return (
    <div className={styles.container}>
      <p> hi </p>
    </div>
  );
}
