import { useEffect, useState } from 'react';
import {
  Container,
  Form,
  InputGroup,
  Button,
  Row,
  Col,
  Table,
} from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { UserCard } from '../../../components/UserCardAdmin/UserCard';

const UserList = () => {
  const [users, setUsers] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  const onEnabled = async (userId) => {
    try {
      await fetchData(`admin/enableUser/${userId}`, 'put');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <h2 className="text-center mb-5">Lista de usuarios</h2>
          <Col md={6} lg={4} className="mx-auto">
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Buscar usuario..."
                  aria-label="Buscar usuario"
                />
                <Button type="submit" variant="primary">
                  Buscar
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={8} lg={6} className="mx-auto">
            {users.map((user) => (
              <UserCard
                key={user.user_id}
                user={user}
                onDisabled={onDisabled}
                onEnabled={onEnabled}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserList;
