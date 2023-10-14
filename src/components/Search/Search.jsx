import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';
import useFetchGames from '../../Hooks/useFetchGames';
import styles from './Search.module.css';
import { Link } from 'react-router-dom';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const [isLoading, gamesFound, error] = useFetchGames(
    `&search=${searchValue}`,
    true
  );
  function handleInput(e) {
    setSearchValue(e.target.value);
  }
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

  if (error) return <p>{error.message}</p>;
  return (
    <Form inline="true" style={{ position: 'relative' }}>
      <Form.Control
        type="text"
        placeholder="Search"
        className={styles.searchInput}
        onChange={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={inputRef}
      />

      {gamesFound && searchValue && (
        <div className={styles.searchBox} ref={searchRef}>
          {gamesFound.map((game) => (
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
        </div>
      )}
    </Form>
  );
}
