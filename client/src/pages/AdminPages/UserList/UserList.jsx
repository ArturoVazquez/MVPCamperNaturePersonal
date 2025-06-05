import { useEffect, useState } from 'react';
import { Container, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { UserCard } from '../../../components/UserCardAdmin/UserCard';
import './userList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchData('admin/getUserList', 'get');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const onDisabled = async (userId) => {
    try {
      await fetchData(`admin/disableUser/${userId}`, 'put');
      setUsers(
        users.map((user) =>
          user.user_id === userId ? { ...user, is_disabled: 1 } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onEnabled = async (userId) => {
    try {
      await fetchData(`admin/enableUser/${userId}`, 'put');
      setUsers(
        users.map((user) =>
          user.user_id === userId ? { ...user, is_disabled: 0 } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullText =
      `${user.name} ${user.lastname} ${user.phone} ${user.email}`.toLowerCase();
    return fullText.includes(searchTerm.toLowerCase());
  });

  return (
    <section className="userList-section">
      <Container>
        <Row>
          <h2 className="text-center my-5 fw-bold">Lista de usuarios</h2>
          <Col md={6} lg={4} className="mx-auto">
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Buscar por nombre, apellido, teléfono o email..."
                  aria-label="Buscar usuario"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={8} lg={6} className="mx-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserCard
                  key={user.user_id}
                  user={user}
                  onDisabled={onDisabled}
                  onEnabled={onEnabled}
                />
              ))
            ) : (
              <p className="text-center">No se encontraron usuarios.</p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserList;
