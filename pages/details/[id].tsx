import { ImageComponent } from '@/src/components/common/image-component';
import { useFetch } from '@/src/hooks/useFetch';
import { getFullYear } from '@/src/utils/string-manipulation';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type VolumeInfoProps = {
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

    const { id } = router.query;

    const URL = `${process.env.BASE_URL}/v1/volumes/${id}`;

    const { data, loading } = useFetch<any>(URL);

    const refinedData= useMemo<VolumeInfoProps>(() => {
        if (!data) return {};
        const { volumeInfo } = data;

        const refined: VolumeInfoProps = {
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
            <div>Loading</div>
        );
    }

    return (
        <section className="space-y-2 p-2 pb-4">
            <div className="px-4 space-y-4 max-w-3xl mx-auto">
                <h1 className="text-xl font-bold text-center">{refinedData.title}</h1>
                <p className="text-center text-sm">Author: {refinedData.publisher}</p>

                <div className="relative w-full h-80 mx-auto">
                    <ImageComponent src={refinedData.thumbnail as string} alt={refinedData.title as string} />
                </div>
                <p className="text-center">Total Pages: {refinedData.pages} Pages</p>
                <h3 className="font-semibold text-lg">Desription:</h3>
                <p className="text-justify" dangerouslySetInnerHTML={{ __html: refinedData.description as string}}></p>
            </div>
        </section>
    );
}
