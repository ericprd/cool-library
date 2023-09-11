import { CardProps } from '@/src/components/common/card';
import { ListDisplay } from '@/src/components/common/list-layout';
import { Pagination } from '@/src/components/common/pagination';
import { useFetch } from '@/src/hooks/useFetch';
import { notNullQueries } from '@/src/utils/not-null-queries';
import { getFullYear } from '@/src/utils/string-manipulation';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { DataProps } from '../home';
import { OptionProps, SelectComponent } from '../../select';
import { Grid, List } from 'react-feather';
import { usePersistentState } from '@/src/hooks/usePersistentState';
import { ButtonIcon } from '../../button/button-icon';

export type ViewProps = 'list' | 'grid';

const SORTBY: OptionProps[] = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Newest', value: 'newest' },
];

const query = ['search', 'search_by', 'page', 'index_items', 'order_by'];


const itemsPerPage = 20;

export default function ResultDisplay() {
  const router = useRouter();
  const { search, search_by, page, index_items, order_by } = router.query;
  const {  state: view, setPersistentValue: setView } = usePersistentState<ViewProps>('grid', 'view');

  const [sortBy, setSortBy] = useState(order_by);

  const numberPage = Number(page);

  const isExist = notNullQueries(query);

  const URL = isExist ? `${process.env.BASE_URL}/v1/volumes?q=${search_by}:${search}&startIndex=${index_items}&maxResults=${itemsPerPage}&orderBy=${sortBy}&key=${process.env.GOOGLE_KEY_API}` : null;

  const { data, loading } = useFetch<DataProps>(URL);

  const refinedData = useMemo(() => {
    if (!data?.items) return { items: [], totalItems: 0 };

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

  }, [data]);

  const totalPages = Math.ceil(refinedData.totalItems / itemsPerPage);

  function pageHandler(dest: 'prev' | 'next') {
    const currentPage = numberPage;
    const lastCurrentIndex = Number(index_items);
    switch(dest) {
    case 'prev':
      router.push({ query: { ...router.query, page: currentPage - 1, index_items: lastCurrentIndex - itemsPerPage } });
      break;
    case 'next':
      router.push({ query: { ...router.query, page: currentPage + 1, index_items: lastCurrentIndex + itemsPerPage } });
      break;
    }
  }

  useEffect(() => {
    router.push({query: { ...router.query, order_by: sortBy }});
  }, [sortBy]);

  return (
    <section className="p-2 space-y-2">
      <div className="flex justify-between items-center px-2 md:px-5">
        <div className="flex items-center gap-3">
          <label>Sort By:</label>
          <div className="border border-gray-300 rounded-md max-w-fit">
            <SelectComponent options={SORTBY} onChange={setSortBy} value={sortBy as string} />
          </div>
        </div>

        <ButtonIcon icon={view === 'grid' ? Grid : List} onClick={() => setView(view === 'grid' ? 'list' : 'grid')}/>
      </div>

      {loading ? (
        <>Loading</>
      ) : (
        <div className="space-y-3">
          <p className="text-lg">Results found: {refinedData.totalItems}</p>

          <ListDisplay data={refinedData.items} view={view!} />

          <Pagination currentPage={numberPage} totalPages={totalPages} nextAction={() => pageHandler('next')} prevAction={() => pageHandler('prev')} />
        </div>
      )}
    </section>
  );
}
