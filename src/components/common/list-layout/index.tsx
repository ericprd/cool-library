import { ViewProps } from '../../layout/result';
import { Card, CardProps } from '../card';

export function ListDisplay(props: { data: CardProps[]; view: ViewProps }) {
    
    const { data, view = 'grid' } = props;

    return (
        <section className={`p-2 ${view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' : 'space-y-4'}`}>
            {data?.map((elm) => (
                <Card key={elm.id} data={elm} view={view} />
            ))}
        </section>
    );
}
