import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch: boolean) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
      setError(null);
    } catch (err) {
        //@ts-ignore
      setError(err instanceof Error ? err.message : new Error("An unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]);

  return { data, error, loading, refetch: fetchData , reset};
};