import { ImageComponent } from '@/src/components/common/image-component';
import { useFetch } from '@/src/hooks/useFetch';
import { usePersistentState } from '@/src/hooks/usePersistentState';
import { getFullYear } from '@/src/utils/string-manipulation';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export type VolumeInfoProps = {
    id: string;
    publisher?: string;
    thumbnail?: string;
    year?: number | null;
    description?: string;
    language?: string;
    pages?: number;
    title?: string;
    categories?: string[];
    previewLink?: string;
};

export default function Details() {
  const router = useRouter();
  const { state: bookmarked, setPersistentValue: setBookmarked } = usePersistentState<VolumeInfoProps[]>([], 'bookmark');

  const { id } = router.query;

  const URL = `${process.env.BASE_URL}/v1/volumes/${id}`;

  const { data, loading, error } = useFetch<any>(URL);

  function isExist(id: string) {
    const isExist = bookmarked?.findIndex(elm => elm.id === id);

    if (isExist < 0) return false;
    return true;
  }

  function bookmarkHandler(book: VolumeInfoProps) {
    if (isExist(book.id)) {
      const filtered = bookmarked.filter(elm => elm.id !== book.id);
      setBookmarked(filtered);
    } else {
      if (Array.isArray(bookmarked)) {
        setBookmarked([...bookmarked, book]);
      } else {
        setBookmarked([book]);
      }
    }
  }

  const refinedData: VolumeInfoProps | undefined = useMemo(() => {
    if (!data) return;
    const { volumeInfo } = data;

    const refined: VolumeInfoProps = {
      id: data.id,
      title: volumeInfo.title,
      categories: volumeInfo.categories ?? [],
      description: volumeInfo.description ?? '',
      language: volumeInfo.language ?? '',
      pages: volumeInfo.pageCount ?? 0,
      previewLink: volumeInfo.previewLink ?? '',
      publisher: volumeInfo.authors?.join(', ') ?? volumeInfo.publisher ?? '',
      thumbnail: volumeInfo.imageLinks?.small ?? volumeInfo.imageLinks?.thumbnail,
      year: getFullYear(volumeInfo.publishedDate) ?? null
    };
    return refined;
  }, [data]);

  if (loading) {
    return (
      <p>Loading</p>
    );
  }

  if (error) {
    return (
      <p>Something went wrong</p>
    );
  }

  return (
    <>
      <Head>
        <title>{refinedData?.title}</title>
      </Head>
    
      <section className="space-y-2 p-2 pb-4">
        {refinedData ? (
          <div className="px-4 space-y-4 max-w-3xl mx-auto">
            <h1 className="text-xl font-bold text-center">{refinedData.title}</h1>
            <p className="text-center text-sm">Author: {refinedData.publisher}</p>

            <div className="relative w-full h-80 mx-auto">
              <ImageComponent src={refinedData.thumbnail as string} alt={refinedData.title as string} />
            </div>
            <p className="text-center">Total Pages: {refinedData.pages} Pages</p>
            <div className="w-full text-center">
              <button onClick={() => bookmarkHandler(refinedData)} className={`${isExist(refinedData.id) ? 'bg-red-500' : 'bg-green-600'} text-white p-2 rounded-md`}>{isExist(refinedData.id) ? 'Remove from bookmark' : 'Add to bookmark'}</button>
            </div>
            <h3 className="font-semibold text-lg">Desription:</h3>
            <p className="text-justify" dangerouslySetInnerHTML={{ __html: refinedData.description as string}}></p>
          </div>
        ) : (
          <p>No Data</p>
        )}
      </section>
    </>
  );
}
