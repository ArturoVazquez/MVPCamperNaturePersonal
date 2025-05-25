import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './navbar.css';

export const NavbarPublic = () => {
  return (
    <Navbar expand="lg" className="camper-navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto camper-nav-links">
            <Nav.Link as={Link} to={'/'}>
              INICIO
            </Nav.Link>
            <Nav.Link as={Link} to="/campernature">
              CAMPER NATURE
            </Nav.Link>
            <Nav.Link as={Link} to="/tarifas">
              TARIFAS
            </Nav.Link>
            <Nav.Link as={Link} to="/entorno">
              ENTORNO
            </Nav.Link>
            <Nav.Link as={Link} to="/reservas">
              RESERVAS
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              CONTACTOS
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/user/profile" className='user-icon'>
            <PersonCircle size={24} /> */}

            {/* 
            </Nav.Link> */}

            <NavDropdown
              
              id="icono-dropdown"
              className="user-icon"
            >
              <PersonCircle size={24} />
              
              <NavDropdown.Item as={Link} to="/register">
                Register
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
