import { useEffect, useRef } from 'react';
import { useState } from 'react';
import useFetchGames from '../../Hooks/useFetchGames';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import styles from './Store.module.css';
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import { motion } from 'framer-motion';
import { platformIcons } from '../../PlatformIcons';
import { Link } from 'react-router-dom';
import Categories from '../../components/Categories/Categories';
import { GamesContext, FetchContext } from '../../components/Contexts/Contexts';

export default function Store() {
  const [page, setPage] = useState(1);
  const [fetchedGames, setFetchedGames] = useState('');
  const [isLoading, games, error, setGames] = useFetchGames(
    `&${fetchedGames}&page=${page}`
  );
  const observerTarget = useRef(null);
  //loading cards
  const cards = [];
  cards.length = 9;
  for (let i = 1; i < 9; i++) {
    cards.push(i); //to use as card key
  }
  const cardStyle = {
    backgroundColor: 'rgba(32, 32, 32, .5)',
    color: 'white',
    borderRadius: '1rem',
    height: '18rem',
    position: 'relative',
    overflow: 'hidden',
  };

  //use the intersection observer to detect when we reach bottom of page
  useEffect(() => {
    const observed = observerTarget.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        //add a new page to display once we reach bottom
        setPage((p) => p + 1);
      }
    });

    if (observed) {
      observer.observe(observed);
    }

    return () => {
      if (observed) {
        observer.unobserve(observed);
      }
    };
  }, [games]); // observer target relies on games array

  if (error) return <p>{error}</p>;
  return (
    <motion.div
      key="store"
      className={styles.store}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 25 }}
      transition={{ duration: 0.6 }}
    >
      <FetchContext.Provider value={{ setPage, setGames }}>
        <GamesContext.Provider value={{ fetchedGames, setFetchedGames }}>
          <Categories />
        </GamesContext.Provider>
      </FetchContext.Provider>
      <div className={styles.storeGames}>
        <div className={styles.games}>
          {games &&
            games.map((game) => (
              <Link
                style={{ textDecoration: 'none' }}
                to="/store/game"
                state={{ id: game.id, screenshots: game.short_screenshots }}
                key={game.id}
              >
                <Card className={styles.card}>
                  <Card.Img
                    variant="top"
                    src={game.background_image}
                    className={styles.gameImage}
                  />
                  <Card.Body>
                    <div className={styles.platforms}>
                      {game.parent_platforms.map(
                        (platform) =>
                          platformIcons[platform.platform.name] && (
                            <img
                              src={platformIcons[platform.platform.name]}
                              alt={platform.platform.name}
                              key={platform.platform.id}
                            />
                          )
                      )}
                    </div>
                    <Card.Title>{game.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          {isLoading && (
            <LoadingAnimation container={cards} style={cardStyle} />
          )}
        </div>
      </div>
      {/*add a page when target intersects, rendered conditionally
       to prevent scroll trigger while still loading */}
      {games && <div ref={observerTarget}></div>}
    </motion.div>
  );
}
