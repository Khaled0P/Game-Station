import { useEffect, useState } from 'react';

export default function useFetchGames(filter, getNew = false) {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=c93fe8e44e324c52879e1017192173b2&${filter}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (getNew) {
          setGames(json.results);
        } else {
          games
            ? setGames([...games, ...json.results])
            : setGames(json.results);
        }
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, getNew]);
  return [isLoading, games];
}
