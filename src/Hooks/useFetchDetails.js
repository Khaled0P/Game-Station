import { useState, useEffect } from 'react';
const API_key = import.meta.env.VITE_API_KEY;

export default function useFetchDetails(id) {
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${API_key}`
        );
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchData();
  }, [id]);
  return [isLoading, details, error];
}
