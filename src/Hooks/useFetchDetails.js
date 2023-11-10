import { useState, useEffect } from 'react';

export default function useFetchDetails(id) {
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=c93fe8e44e324c52879e1017192173b2`
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