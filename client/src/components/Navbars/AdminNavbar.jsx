import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

export const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="camper-navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto camper-nav-links">
          
            <Nav.Link as={Link} to="/admin/userList">
              CLIENTES
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/service">
              SERVICIOS
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/reserves">
              RESERVAS
            </Nav.Link>
            <NavDropdown
              title={<PersonCircle size={24} />}
              id="user-dropdown"
              align="end"
              className="user-icon"
            >
              <NavDropdown.Item onClick={logout}>
                LOGOUT
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
