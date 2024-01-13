import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.css';
import { Link, useNavigate } from 'react-router-dom';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { SearchLoading } from '../LoadingAnimation/LoadingAnimation';

export default function Search() {
  const [searchValue, setSearchValue] = useState();
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const [gamesFound, setGamesFound] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${
            import.meta.env.VITE_API_KEY
          }&search=${searchValue}`
        );

        const data = await response.json();
        if (!response.ok || (response.ok && data.results.length === 0)) {
          throw new Error(response.status);
        }
        setGamesFound(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchValue) {
      // delay fetch to display loading animation
      fetchData();
    }
  }, [searchValue]);

  function handleInput(e) {
    // start loading animation and clear games array
    setIsLoading(true);
    setGamesFound(null);

    let timeoutId;
    // Clear previous timeout
    clearTimeout(timeoutId);

    // make sure user is done typing before updating state
    searchValue
      ? (timeoutId = setTimeout(() => {
          setSearchValue(e.target.value);
        }, 1500))
      : setSearchValue(e.target.value); // update imemdiately if searchValue empty to display search box
  }

  //pick the first game on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/store/game', {
      state: {
        id: gamesFound[0].id,
        screenshots: gamesFound[0].short_screenshots,
      },
    });
    inputRef.current.blur();
  };

  function clearInput() {
    inputRef.current.value = '';
    setSearchValue('');
  }

  function handleBlur() {
    setTimeout(() => {
      if (searchRef.current) searchRef.current.style.display = 'none';
      inputRef.current.style.width = '310px';
    }, 150);
  }
  function handleFocus() {
    if (searchRef.current) searchRef.current.style.display = 'block';
    window.innerWidth >= 870
      ? (inputRef.current.style.width = '480px')
      : (inputRef.current.style.width = '400px');
  }

  return (
    <Form
      inline="true"
      style={{ position: 'relative' }}
      onSubmit={handleSubmit}
    >
      <Form.Control
        type="text"
        placeholder="Search"
        className={styles.searchInput}
        onChange={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={inputRef}
      />

      {searchValue && (
        <div className={styles.searchBox} ref={searchRef}>
          {gamesFound &&
            gamesFound.map((game) => (
              <Link
                to="/store/game"
                state={{ id: game.id, screenshots: game.short_screenshots }}
                key={game.id}
              >
                <div className={styles.game} onClick={clearInput}>
                  <img src={game.background_image} alt={game.name} />
                  <h4>{game.name}</h4>
                </div>
              </Link>
            ))}
          {isLoading && <SearchLoading />}
          {error && <ErrorHandler games={null} error={error} />}
        </div>
      )}
    </Form>
  );
}
