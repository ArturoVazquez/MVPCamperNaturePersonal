import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarProvisional = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to={'/'}>
            Inicio
          </Nav.Link>
          <Nav.Link>CamperNature</Nav.Link>
          <Nav.Link>Tarifas</Nav.Link>
          <Nav.Link>Entorno</Nav.Link>
          <Nav.Link>Reservas</Nav.Link>
          <Nav.Link as={Link} to={'/contact'}>
            Contactos
          </Nav.Link>
          <Nav.Link>Registro</Nav.Link>
          <Nav.Link>Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
