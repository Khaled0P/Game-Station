// import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Home.module.css';
import useFetchGames from '../../Hooks/useFetchGames';
import { motion } from 'framer-motion';

export default function Home() {
  const [isLoading, popularGames, error] = useFetchGames('metacritic=100');
  if (error) return <p>{error}</p>;
  if (popularGames) {
    popularGames.length = 5;
    console.log(popularGames);
  }
  return (
    <motion.div
      className={styles.home}
      initial={{
        opacity: 0,
        translateX: -50,
        background: 'none',
      }}
      animate={{
        opacity: 1,
        translateX: 0,
        background: '',
      }}
      exit={{
        opacity: 0,
        translateX: -50,
        background: 'none',
        transition: { duration: 0.6 },
      }}
    >
      <div className={styles.header}>
        <h1>Game Station</h1>
        <h3>Your One-Stop Shop for Gaming Excellence</h3>
      </div>
      <h1 className={styles.carouselHeader}>All Time Top</h1>
      {popularGames && (
        <Carousel className={styles.carousel} fade="true">
          {popularGames.map((game) => (
            <Carousel.Item key={game.id} className={styles.carouselItem}>
              <div className={styles.image}>
                <img src={game.background_image} alt={`${game.name}image`} />
              </div>
              <div className={styles.text}>
                <h1>{game.name}</h1>
                <div className={styles.screenShots}>
                  {game.short_screenshots.slice(1, 5).map((screenshot) => (
                    <img
                      src={screenshot.image}
                      alt="game screenshot"
                      key={screenshot.id}
                    />
                  ))}
                </div>
                <div>
                  <p>
                    <b>Genre: </b>
                    {game.genres[0].name}, {game.genres[1].name}
                  </p>
                  <p>
                    <b>Tags: </b>
                    {game.tags[0].name}, {game.tags[1].name},{game.tags[2].name}
                    , {game.tags[4].name}
                  </p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {isLoading && (
        <div style={{ color: 'white', textAlign: 'center' }}>loading...</div>
      )}
    </motion.div>
  );
}
