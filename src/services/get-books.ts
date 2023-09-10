import axios, { AxiosError } from 'axios';

export type GetBooksProps = {
    searchBy: string;
    searchParams: string;
    lastIndex: number;
}

export async function GetBooks(props: GetBooksProps) {
    const { searchBy, lastIndex, searchParams } = props;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchBy}:${searchParams}&startIndex=${lastIndex}&maxResults=20&key=${process.env.GOOGLE_KEY_API}`;
    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error.response?.data;
        }
    }
}
