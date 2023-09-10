import { ListDisplay } from '@/src/components/common/list-layout';
import { Pagination } from '@/src/components/common/pagination';
import { notNullQueries } from '@/src/utils/not-null-queries';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export default function Result() {
    const router = useRouter();
    const { search, search_by, page, index_items } = router.query;

    const itemsPerPage = 15;

    const numberPage = Number(page);
    const [totalBooks, setTotalBooks] = useState(0);

    const URL = notNullQueries([search, search_by, page, index_items] as string[]) ? `${process.env.BASE_URL}/v1/volumes?q=${search_by}:${search}&startIndex=${index_items}&maxResults=${itemsPerPage}&key=${process.env.GOOGLE_KEY_API}` : null;

    const setTotalItems = useCallback(function(total: number) {
        setTotalBooks(total);
    }, []);

    const totalPages = Math.ceil(totalBooks / itemsPerPage);

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

    return (
        <section className="p-2">
            <ListDisplay url={URL} action={setTotalItems} />

            <Pagination currentPage={numberPage} totalPages={totalPages} nextAction={() => pageHandler('next')} prevAction={() => pageHandler('prev')} />
        </section>
    );
}
