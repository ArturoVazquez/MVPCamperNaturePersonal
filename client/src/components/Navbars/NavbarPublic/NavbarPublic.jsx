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
            <NavDropdown title="ENTORNO" id="entorno-dropdown">
              <NavDropdown.Item as={Link} to="/nature">
                Naturaleza
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adventure">
                Actividades
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/culture">
                Cultura
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/reservas">
              RESERVAS
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              CONTACTOS
            </Nav.Link>
            <Nav.Link as={Link} to="/user/profile" className="user-icon">
              <PersonCircle size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
