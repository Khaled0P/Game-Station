import useFetchDetails from '../../Hooks/useFetchDetails';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from 'react-router-dom';
import styles from './GamePage.module.css';
import './GamePageBootstrap.css';
import { motion } from 'framer-motion';

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
  const [isLoading, details, error] = useFetchDetails(id);
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  return (
    <motion.div
      className={styles.gamePage}
      initial={{ opacity: 0, translateX: -50, background: 'none' }}
      animate={{ opacity: 1, translateX: 0, background: '' }}
      exit={{
        opacity: 0,
        translateX: -50,
        background: 'none',
        transition: { duration: 0.6 },
      }}
    >
      <h1>{details.name}</h1>
      <div className={styles.aboutGame}>
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
                  <li>Website: {details.website}</li>
                  <li>Genres: {returnItems(details.genres)}</li>
                  <li>Platforms: {returnItems(details.platforms)}</li>
                  <li>Developers: {returnItems(details.developers)}</li>
                  <li>Publishers: {returnItems(details.publishers)}</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
}
