import Head from 'next/head';
import styles from '../../../../styles/Home.module.scss';
import { ListDisplay } from '@/src/components/common/list-layout';
import { useFetch } from '@/src/hooks/useFetch';
import { useMemo } from 'react';
import { getFullYear } from '@/src/utils/string-manipulation';
import { BookInfoProps, CardProps } from '@/src/components/common/card';

export type DataProps = {
  totalItems: number;
  items: {
    volumeInfo: BookInfoProps;
    id: string;
  }[];
}

const query = '/v1/volumes?q=programming&startIndex=0&maxResults=20&key=';

const URL = process.env.BASE_URL + query + process.env.GOOGLE_KEY_API;

export default function HomeDisplay() {
  const { data, loading, error } = useFetch<DataProps>(URL) ;

  const refinedData: { items: CardProps[] | []; totalItems: number } = useMemo(() => {
    if (data?.items) {
      const newData = data.items.map(elm => {
        const { id, volumeInfo } = elm;
        const obj: CardProps = {
          id: id,
          title: volumeInfo.title,
          img_url: volumeInfo.imageLinks?.smallThumbnail,
          author: volumeInfo.authors?.join(', ') ?? volumeInfo.publisher,
          year: getFullYear(volumeInfo.publishedDate),
        };

        return obj;
      });
      
      return { items: newData, totalItems: data.totalItems };
    }

    return { items: [], totalItems: 0 };
  }, [data]);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return (
      <p>Something went wrong</p>
    );
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Cool Library</title>
        <meta name="description" content="Coolest Library App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="space-y-7">
        <h1 className="text-center text-3xl">Welcome to the coolest library!</h1>
        <p className="text-center">Find your favorite books.</p>

        <ListDisplay data={refinedData.items} />
      </section>
    </div>
  );
};
