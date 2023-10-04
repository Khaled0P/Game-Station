import { useContext, useState } from 'react';
import { CartContext } from '../../App';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Cart.module.css';
import './CartBootstrap.css';

export default function Cart() {
  const { cart, toggleAddToCart } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const total = cart.reduce((total, game) => {
    return total + game.price;
  }, 0);
  return (
    <div className={styles.cart}>
      <button className={styles.cartButton} onClick={handleShow}></button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className={styles.cartCanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.canvas}>
          {cart.length > 0 && (
            <div className={styles.cartDetails}>
              {cart.map((game) => (
                <div className={styles.cartItems} key={game.id}>
                  <div
                    className={styles.removeGameBtn}
                    onClick={() => toggleAddToCart(game)}
                  >
                    x
                  </div>
                  <div className={styles.gameDetails}>
                    <img src={game.image} alt="Game background image" />
                    <div className={styles.text}>
                      <div className={styles.gameName}>{game.name}</div>
                      <div className={styles.price}>{game.price}$</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={styles.total}>
            Total Price: <span style={{ marginLeft: 'auto' }}>{total}$</span>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {cart.length > 0 && (
        <div className={styles.notification}>{cart.length}</div>
      )}
    </div>
  );
}
