import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import styles from './LoadingAnimation.module.css';
import PropTypes from 'prop-types';

export function SearchLoading() {
  return (
    <div className={styles.searchLoader}>
      <div className={styles.outerCircle}></div>
      <div className={styles.innerCircle}></div>
    </div>
  );
}

const Shimmer = () => {
  return (
    <div className={styles.shimmerWrapper}>
      <div className={styles.shimmer}></div>
    </div>
  );
};

export default function LoadingAnimation({ container, style }) {
  return (
    <>
      {container.map((item) => (
        <Card style={style} key={item}>
          <Card.Body>
            <Card.Title></Card.Title>
          </Card.Body>
          <Shimmer />
        </Card>
      ))}
    </>
  );
}

LoadingAnimation.propTypes = {
  container: PropTypes.array,
  style: PropTypes.object,
};
