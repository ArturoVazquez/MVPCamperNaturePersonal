import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './navbar.css'
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
            <Nav.Link as={Link} to="/user/profile" className='user-icon'>
            <PersonCircle size={24} />
            </Nav.Link>
           <Button className='logout' onClick={logout}>Logout</Button>
        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
