import { ViewProps } from '../../layout/result';
import { Card, CardProps } from '../card';
import style from './ListLayout.module.scss';

export function ListDisplay(props: { data: CardProps[]; view?: ViewProps }) {
  const { data, view = 'grid' } = props;

  return (
    <section className={view === 'grid' ? style.layout_container_grid : style.layout_container}>
      {data?.map((elm) => (
        <Card key={elm.id} data={elm} view={view} />
      ))}
    </section>
  );
}
