import style from './Card.module.scss';
import Image from 'next/image';
import { truncateText } from '@/src/utils/string-manipulation';
import { useRouter } from 'next/router';
import { ViewProps } from '../../layout/result';

export type CardProps = {
  id: string;
  img_url?: string;
  title: string;
  author: string | undefined;
  year: number | null;
}

export type BookInfoProps = {
  title: string;
  imageLinks: {
    smallThumbnail?: string;
  };
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
}

type DataProps = {
  data: CardProps;
  view: ViewProps;
}

export function Card(props: DataProps) {
  const { data, view } = props;
  const router = useRouter();

  const isGrid = view === 'grid';
  
  return (
    <div className={isGrid ? style.container_grid : style.container} onClick={() => router.push(`/details/${data.id}`)}>
      <div className={isGrid ? style.image_container_grid : style.image_container}>
        {data.img_url ? (
          <Image src={data.img_url} alt={data.title} className={isGrid ? style.image_grid : style.image} fill />
        ) : (
          <div className={isGrid ? style.image_grid : style.image} />
        )}
      </div>

      <div className={isGrid ? style.text_container_grid : style.text_container}>
        <h1>{truncateText(data.title, isGrid ? 24 : 30)}</h1>
        <h3>{truncateText(data.author!, isGrid ? 18 : 20)}</h3>
        <p>{data.year}</p>
      </div>
    </div>
  );
}
