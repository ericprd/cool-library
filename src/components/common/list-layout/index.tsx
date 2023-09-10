import { getFullYear } from '@/src/utils/string-manipulation';
import { Card } from '../card';
import { useMemo } from 'react';
import { useFetch } from '@/src/hooks/useFetch';

export type ListDisplayProps = {
    url: string | null;
    action?: (n: number) => void;
}

type DataProps = {
    totalItems: number;
    items: any[];
}

export function ListDisplay(props: ListDisplayProps) {
    const { url, action } = props;
    const {data, loading} = useFetch<DataProps>(url);

    const refinedData = useMemo(() => {
        if (data?.items) {
        const newData = data.items.map(elm => {
            const { id, volumeInfo } = elm;
            const obj = {
            id: id,
            title: volumeInfo.title,
            img_url: volumeInfo.imageLinks?.smallThumbnail,
            author: volumeInfo.authors?.join(', ') ?? volumeInfo.publisher,
            year: getFullYear(volumeInfo.publishedDate),
            };
            return obj;
        });

        if (action) {
            action(data?.totalItems);
        }

        return newData;
        }
        return [];
    }, [data]);

    if (loading) {
        return (
        <div>Loading page</div>
        );
    }

    return (
        <section className="p-2 space-y-5">
            {refinedData?.map((elm) => (
                <Card key={elm.id} data={elm} />
            ))}
        </section>
    );
}
