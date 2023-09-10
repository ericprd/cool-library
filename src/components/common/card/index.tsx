import style from './Card.module.scss';
import Image from 'next/image';
import { truncateText } from '@/src/utils/string-manipulation';
import { useRouter } from 'next/router';

export type CardProps = {
  id: string;
  img_url: string;
  title: string;
  author: string;
  year: number | null;
}

type DataProps = {
  data: CardProps;
}

export function Card(props: DataProps) {
  const { data } = props;
  const router = useRouter();
  
  return (
    <div className={style.container} onClick={() => router.push(`/details/${data.id}`)}>
      <div className={style.image_container}>
        {data.img_url ? (
          <Image src={data.img_url} alt={data.title} className={style.image} fill />
        ) : (
          <div className={style.image} />
        )}
      </div>

      <div className={style.text_container}>
        <h1>{truncateText(data.title, 33)}</h1>
        <h3>{truncateText(data.author, 20)}</h3>
        <p>{data.year}</p>
      </div>
    </div>
  );
}
