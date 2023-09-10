import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { ListDisplay } from '@/src/components/common/list-layout';

const URL = `${process.env.BASE_URL}/v1/volumes?q=search&startIndex=0&maxResults=20&key=${process.env.GOOGLE_KEY_API}`;
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cool Library</title>
        <meta name="description" content="Coolest Library App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ListDisplay url={URL} />
    </div>
  );
};

export default Home;
