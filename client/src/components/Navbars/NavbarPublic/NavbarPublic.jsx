import { Navbar, Container, Nav } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './navbar.css'

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
            <Nav.Link>CAMPER NATURE</Nav.Link>
            <Nav.Link>TARIFAS</Nav.Link>
            <Nav.Link>ENTORNO</Nav.Link>
            <Nav.Link>RESERVAS</Nav.Link>
            <Nav.Link>CONTACTOS</Nav.Link>
            <Nav.Link as={Link} to="/user/profile" className='user-icon'>
            <PersonCircle size={24} />
            
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
