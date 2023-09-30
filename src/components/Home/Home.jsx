// import { useEffect, useState } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Home.module.css';
import useFetchGames from '../../Hooks/useFetchGames';

export default function Home() {
  const [isLoading, popularGames] = useFetchGames('metacritic=100');
  if (isLoading) return <p>Loading...</p>;
  popularGames.length = 5;
  return (
    <div className={styles.home}>
      <NavigationBar />
      <div className={styles.header}>
        <h1>Game Station</h1>
        <h3>Your One-Stop Shop for Gaming Excellence</h3>
      </div>
      <Carousel className={styles.carousel} fade="true">
        {popularGames.map((game) => (
          <Carousel.Item key={game.id} className={styles.carouselItem}>
            <div className={styles.image}>
              <img src={game.background_image} alt={`${game.name}image`} />
            </div>
            <div className={styles.text}>
              <h1>{game.name}</h1>
              <div>
                <p>
                  <b>Genre: </b>
                  {game.genres[0].name}, {game.genres[1].name}
                </p>
                <p>
                  <b>Tags: </b>
                  {game.tags[0].name}, {game.tags[1].name},{game.tags[2].name},{' '}
                  {game.tags[4].name}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <p>test</p>
    </div>
  );
}
