import { useState } from 'react';
import useFetchGames from '../../Hooks/useFetchGames';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import styles from './Store.module.css';

export default function Store() {
  const [isLoading, games] = useFetchGames(`page=1`);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.store}>
      <div className={styles.games}>
        {games.map((game) => (
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
      </div>
    </div>
  );
}
