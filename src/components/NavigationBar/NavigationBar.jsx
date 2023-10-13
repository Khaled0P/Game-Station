import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.png';
import styles from './NavigationBar.module.css';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Search from '../Search/Search';

export default function NavigationBar() {
  return (
    <Navbar expand="md" className={styles.nav}>
      <Navbar.Brand href="#home" className={styles.logo}>
        <img
          alt="Logo"
          src={logo}
          width="50"
          height="50"
          className={`${styles.logoImg} d-inline-block align-top`}
        />{' '}
        <span>Game Station</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles.mainNav}>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/store">
            Store
          </Link>
        </Nav>
        <Search />
        <Cart />
      </Navbar.Collapse>
    </Navbar>
  );
}
