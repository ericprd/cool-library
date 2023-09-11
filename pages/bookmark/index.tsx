import { CardProps } from '@/src/components/common/card';
import { ListDisplay } from '@/src/components/common/list-layout';
import { VolumeInfoProps } from '@/src/components/layout/details';
import { ViewProps } from '@/src/components/layout/result';
import { usePersistentState } from '@/src/hooks/usePersistentState';
import { useMemo } from 'react';
import { Grid, List } from 'react-feather';
import style from './Bookmark.module.scss';
import { ButtonIcon } from '@/src/components/button/button-icon';

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
    <section className={style.bookmark_container}>
      <div className={style.action_container}>
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
