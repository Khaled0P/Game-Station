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
    let intersectionStartTime; //to prevent instant activation on category change

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          // If the target starts intersecting, record the start time
          if (!intersectionStartTime) {
            intersectionStartTime = Date.now();
          }
        } else {
          // If the target is not intersecting, reset the start time
          intersectionStartTime = null;
        }

        // Check if the target has been intersecting for a specific duration
        const intersectionDuration = Date.now() - intersectionStartTime;
        if (intersectionStartTime && intersectionDuration >= 2000) {
          setPage((p) => p + 1);
          // Reset the start time to prevent triggering the action multiple times
          intersectionStartTime = null;
        }
      },
      { threshold: 0.3 }
    );

    if (observed) {
      observer.observe(observed);
    }

    return () => {
      if (observed) {
        observer.unobserve(observed);
      }
    };
  }, [observerTarget]);
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
          <div ref={observerTarget}></div>
        </div>
      </div>
    </motion.div>
  );
}
