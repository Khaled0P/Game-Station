import { useEffect, useRef } from 'react';
import { useState } from 'react';
import useFetchGames from '../../Hooks/useFetchGames';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import styles from './Store.module.css';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

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
    <div className={styles.store}>
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
    </div>
  );
}