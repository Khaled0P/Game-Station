import PropTypes from 'prop-types';
import styles from './ErrorHandler.module.css';
export default function ErrorHandler({ error, games }) {
  if (error.message === '200') {
    return (
      <div className={styles.errorPage}>
        <h1>This category is empty.... Too empty</h1>
        <h4>Try a different filter</h4>
      </div>
    );
  } else if (error.message === '404' && games) {
    return (
      <h4 style={{ textAlign: 'center' }}>
        You reached the bottom of the page. try a different filter
      </h4>
    );
  } else
    return (
      <div className={styles.errorPage}>
        <h1>The server responded with a status of: {error.message} </h1>
        <h4>Please try again.</h4>
      </div>
    );
}

ErrorHandler.propTypes = {
  error: PropTypes.object,
  games: PropTypes.any,
};
