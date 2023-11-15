import { releases, top_games, platforms, genres } from './Data';
import PropTypes from 'prop-types';
import styles from './Categories.module.css';
import { useContext, useEffect, useState } from 'react';
import { GamesContext, FetchContext } from '../Contexts/Contexts';
import Filter from '../../assets/filter.svg?react';
import Close from '../../assets/close.svg?react';

function Category({
  categoryContent,
  title,
  selected,
  setSelected,
  setActive,
}) {
  const { setPage, setGames } = useContext(FetchContext);
  const { fetchedGames, setFetchedGames } = useContext(GamesContext);
  function handleClick(item) {
    const fetchFilter = `${categoryContent.filter}=${item.value ?? item.name}`;
    if (fetchedGames === fetchFilter) return; //prevent multiple clicks
    setSelected(item.name);
    setGames(null);
    setPage(1);
    setFetchedGames(fetchFilter);
    setActive((a) => !a);
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
            <div className={styles.iconContainer}>{item.icon}</div>
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
  setActive: PropTypes.func,
};

export default function Categories() {
  const [selected, setSelected] = useState('All time top');
  const [active, setActive] = useState(false);
  const [preventTransition, setPreventTransition] = useState(false);

  //clear responsive behavior on resize
  useEffect(() => {
    const removeActiveClass = () => {
      if (window.innerWidth > 650) {
        if (active) setActive(false);
        setPreventTransition(true);
      } else {
        setPreventTransition(false);
      }
    };
    window.addEventListener('resize', removeActiveClass);
    return () => {
      window.removeEventListener('resize', removeActiveClass);
    };
  });

  return (
    <>
      <button
        className={styles.menuButton}
        onClick={() => {
          setActive(!active);
        }}
      >
        {active ? <Close /> : <Filter />}
      </button>
      <div
        className={`${styles.categories}
         ${active ? styles.activeMenu : ''}
          ${preventTransition ? styles.preventTransition : ''}`}
      >
        <Category
          categoryContent={top_games}
          title="Top Games"
          selected={selected}
          setSelected={setSelected}
          setActive={setActive}
        />
        <Category
          categoryContent={releases}
          title="New Releases"
          selected={selected}
          setSelected={setSelected}
          setActive={setActive}
        />
        <Category
          categoryContent={platforms}
          title="Platforms"
          selected={selected}
          setSelected={setSelected}
          setActive={setActive}
        />
        <Category
          categoryContent={genres}
          title="Genres"
          selected={selected}
          setSelected={setSelected}
          setActive={setActive}
        />
      </div>
    </>
  );
}
