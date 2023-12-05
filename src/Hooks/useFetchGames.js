import { useEffect, useState } from 'react';
const API_key = import.meta.env.VITE_API_KEY;

export default function useFetchGames(filter) {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_key}${filter}`
        );

        const data = await response.json();
        if (!response.ok || (response.ok && data.results.length === 0)) {
          console.log(data.results);
          throw new Error(response.status);
        }
        games ? setGames([...games, ...data.results]) : setGames(data.results);
        setError(null);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    //delay fetch to show off loading animation
    setTimeout(fetchData, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return [isLoading, games, error, setGames];
}
