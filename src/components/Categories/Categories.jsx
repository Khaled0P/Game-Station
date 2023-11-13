import { releases, top_games, platforms, genres } from './Data';
import PropTypes from 'prop-types';
import styles from './Categories.module.css';
import { useContext, useState } from 'react';
import { GamesContext, FetchContext } from '../Contexts/Contexts';

function Category({ categoryContent, title, selected, setSelected }) {
  const { setPage, setGames } = useContext(FetchContext);
  const { fetchedGames, setFetchedGames } = useContext(GamesContext);
  function handleClick(item) {
    const fetchFilter = `${categoryContent.filter}=${item.value ?? item.name}`;
    if (fetchedGames === fetchFilter) return; //prevent multiple clicks
    setSelected(item.name);
    setGames(null);
    setPage(1);
    setFetchedGames(fetchFilter);
  }
  return (
    <div className={styles.category}>
      <h1>{title}</h1>
      <div className={styles.content}>
        {categoryContent.content.map((item) => (
          <div
            className={
              selected === item.name ? styles.selectedFilter : styles.filter
            }
            key={item.name}
            onClick={() => handleClick(item)}
          >
            <div className={styles.svgContainer}>{item.icon}</div>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

Category.propTypes = {
  categoryContent: PropTypes.object,
  title: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
};

export default function Categories() {
  const [selected, setSelected] = useState('All time top');
  return (
    <div className={styles.categories}>
      <Category
        categoryContent={top_games}
        title="Top Games"
        selected={selected}
        setSelected={setSelected}
      />
      <Category
        categoryContent={releases}
        title="New Releases"
        selected={selected}
        setSelected={setSelected}
      />
      <Category
        categoryContent={platforms}
        title="Platforms"
        selected={selected}
        setSelected={setSelected}
      />
      <Category
        categoryContent={genres}
        title="Genres"
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}
