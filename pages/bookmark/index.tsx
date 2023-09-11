import { CardProps } from '@/src/components/common/card';
import { ListDisplay } from '@/src/components/common/list-layout';
import { ButtonIcon } from '@/src/components/common/navbar';
import { ViewProps } from '@/src/components/layout/result';
import { usePersistentState } from '@/src/hooks/usePersistentState';
import { VolumeInfoProps } from 'pages/details/[id]';
import { useMemo } from 'react';
import { Grid, List } from 'react-feather';

export default function Bookmarked() {
  const { state: bookmarkedList } = usePersistentState<VolumeInfoProps[]>([], 'bookmark');
  const { state: view, setPersistentValue: setView } = usePersistentState<ViewProps>('grid', 'view');

  const refinedBookmark = useMemo(() => {
    const newData = bookmarkedList.map(elm => {
      const obj: CardProps = {
        id: elm.id,
        title: elm.title ?? '',
        img_url: elm.thumbnail,
        author: elm.publisher,
        year: elm.year ?? 0,
      };
    
      return obj;
    });

    return newData;
  }, [bookmarkedList]);

  return (
    <section className="space-y-2 p-2">
      <div className="flex justify-end items-center px-2 md:px-5">
        <ButtonIcon icon={view === 'grid' ? Grid : List} onClick={() => setView(view === 'grid' ? 'list' : 'grid')}/>
      </div>

      {refinedBookmark.length > 0 ? (
        <ListDisplay data={refinedBookmark} view={view} />
      ) : (
        <p>No data</p>
      )}
    </section>
  );
}
