import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../assets/logo.png';
import styles from './NavigationBar.module.css';

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
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Store</Nav.Link>
        </Nav>
        <Form inline="true">
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
