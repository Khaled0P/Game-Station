import { useEffect, useRef } from 'react';
import { useState } from 'react';
import useFetchGames from '../../Hooks/useFetchGames';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import styles from './Store.module.css';
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import { motion } from 'framer-motion';

export default function Store() {
  const [page, setPage] = useState(1);
  const [isLoading, games, error] = useFetchGames(`page=${page}`);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observed = observerTarget.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1 }
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
      className={styles.store}
      initial={{ opacity: 0, translateX: -50, background: 'none' }}
      animate={{ opacity: 1, translateX: 0, background: '' }}
      exit={{
        opacity: 0,
        translateX: -50,
        background: 'none',
        transition: { duration: 0.6 },
      }}
    >
      <div className={styles.games}>
        {games &&
          games.map((game) => (
            <Card className={styles.card} key={game.id}>
              <Card.Img
                variant="top"
                src={game.background_image}
                className={styles.gameImage}
              />
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        {isLoading && <LoadingAnimation />}
      </div>
      <div ref={observerTarget}></div>
    </motion.div>
  );
}
