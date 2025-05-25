import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import '.././NavbarPublic/navbar.css'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';

export const UserNavbar = () => {
  
  const {logout} = useContext(AuthContext);
  
  return (
    <Navbar expand="lg" className="camper-navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto camper-nav-links">
            <Nav.Link as={Link} to={'/'}>
              INICIO
            </Nav.Link>
            <Nav.Link as={Link} to="/campernature">CAMPER NATURE</Nav.Link>
            <Nav.Link as={Link} to="/tarifas">TARIFAS</Nav.Link>
            <Nav.Link as={Link} to="/entorno">ENTORNO</Nav.Link>
            <Nav.Link as={Link} to="/reservas">RESERVAS</Nav.Link>
            <Nav.Link as={Link} to="/contact">CONTACTOS</Nav.Link>
            <NavDropdown
              title={<PersonCircle size={24} />}
              id="user-dropdown"
              align="end"
              className="user-icon"
            >
              <NavDropdown.Item as={Link} to="/user/profile">
                PERFIL
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>
                LOGOUT
              </NavDropdown.Item>
            </NavDropdown>
           
        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
