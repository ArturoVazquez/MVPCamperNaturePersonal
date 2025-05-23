import React, { useState } from 'react';
import { useContext } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Link, replace, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';

import { ZodError } from 'zod';
import { loginSchema } from '../../../schemas/loginSchemas';

const initialValue = {
  email: '',
  password: '',
};
const Login = () => {
  const [loginData, setLoginData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');
  const [valError, setValError] = useState();
  const { login } = useContext(AuthContext);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const onSubmit = async () => {
    setErrorMsg("");
    setValError();
    try {
      if (!loginData.email || !loginData.password) {
        setErrorMsg('Tienes que rellenar todos los campos');
      } else {
        loginSchema.parse(loginData);
        await login(loginData);
      }
    } catch (error) {
      console.log('error en Login', error);

      if (error instanceof ZodError) {
       
        let objTemp = error.errors[0].message;
        setValError(objTemp);
      }

      if (error.response) {
        setErrorMsg(error.response.data.message);
      }
    }
  };
  return (
    <section>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-6">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="EmailTextInput">Email</Form.Label>
                <Form.Control
                  id="EmailTextInput"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                />
                {valError && <p>{valError}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="passwordTextInput">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="passwordTextInput"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button onClick={onSubmit}>Submit</Button>
            </Form>
            <p>{errorMsg}</p>
            <p>
              Si no estas registrado{' '}
              <Link to={'/register'}>registrate aqui</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
