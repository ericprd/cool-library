import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData(url: string) {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url) getData(url);
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}
