import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import styles from './LoadingAnimation.module.css';

const cards = [];
for (let i = 0; i < 9; i++) {
  cards.push(i);
}

const Shimmer = () => {
  return (
    <div className={styles.shimmerWrapper}>
      <div className={styles.shimmer}></div>
    </div>
  );
};

export default function LoadingAnimation() {
  return (
    <>
      {cards.map((card) => (
        <Card className={styles.card} key={card}>
          <div className={styles.gameImage}></div>
          <Card.Body>
            <Card.Title></Card.Title>
          </Card.Body>
          <Shimmer />
        </Card>
      ))}
    </>
  );
}
