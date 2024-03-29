import useFetchDetails from '../../Hooks/useFetchDetails';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from 'react-router-dom';
import styles from './GamePage.module.css';
import './GamePageBootstrap.css';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { CartContext } from '../../components/Contexts/Contexts';
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';

function returnItems(list) {
  return list.map((item, i) => {
    if (item.platform) {
      item = item.platform;
    }
    if (i === list.length - 1) return item.name;
    return `${item.name}, `;
  });
}

export default function GamePage() {
  const location = useLocation();
  const { id, screenshots } = location.state;
  const { cart, toggleAddToCart } = useContext(CartContext);
  const added = cart.find((item) => item.id === id);
  const [isLoading, details, error] = useFetchDetails(id);
  return (
    <motion.div
      className={styles.gamePage}
      key="gamePage"
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.6 }}
    >
      {isLoading ? (
        <div className={styles.aboutGame}>
          <LoadingAnimation
            container={['carousel', 'details']}
            style={{
              width: '98%',
              height: '450px',
              backgroundColor: 'rgb(26, 26, 26)',
              borderRadius: '20px',
            }}
          />
        </div>
      ) : (
        <>
          <div className={styles.aboutGame}>
          <h1 style={{gridColumnStart:'span 2'}}>{details.name}</h1>
            <div className={styles.carouselContainer}>
              <Carousel className={styles.carousel}>
                {screenshots.map((screenshot) => (
                  <Carousel.Item
                    key={screenshot.id}
                    className={styles.carouselItem}
                  >
                    <div className={styles.image}>
                      <img src={screenshot.image} alt="game screenshot" />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className={styles.details}>
              <div className={styles.description}>
                <h1>Description</h1>
                {details.description_raw}
              </div>
              <Accordion>
                <Accordion.Item className={styles.more} eventKey="0">
                  <Accordion.Header>More</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>
                        <a href={details.website}>Website: {details.website}</a>
                      </li>
                      <li>Genres: {returnItems(details.genres)}</li>
                      <li>Platforms: {returnItems(details.platforms)}</li>
                      <li>Developers: {returnItems(details.developers)}</li>
                      <li>Publishers: {returnItems(details.publishers)}</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <button
                className={styles.addToCart}
                onClick={() => {
                  toggleAddToCart(details);
                }}
              >
                {added ? (
                  <>
                    Added <div className={styles.checkMark}></div>
                  </>
                ) : (
                  'Add To Cart +'
                )}
              </button>
            </div>
          </div>
        </>
      )}
      {error && <ErrorHandler games={details} error={error} />}
    </motion.div>
  );
}
