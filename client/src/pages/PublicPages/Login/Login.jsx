import React, { useState } from 'react';
import { useContext } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { Link, replace, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';
import './login.css';

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
  const navigate =  useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const onSubmit = async () => {
    setErrorMsg('');
    setValError();
    try {
      if (!loginData.email || !loginData.password) {
        setErrorMsg('Tienes que rellenar todos los campos');
      } else {
        loginSchema.parse(loginData);
        await login(loginData);
        navigate('/user/profile')
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
    <section className="login-section">
      <Container className="container-login">
        <Row className="w-100 align-items-center text-center">
          <Col md={12} lg={12}>
            <h1 className='login-title'>
              Estás a un paso de la desconexión digital...
              <br />
              ...Ironías de la vida moderna
            </h1>
            <Form className="form-login">
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

              <button type='button' className='login-button' onClick={onSubmit}>Iniciar sesión</button>
              <p>{errorMsg}</p>
              <p className='login-message'>
                ¿No estás registrado?{' '}
                <Link to={'/register'}>
                  <strong>¡Regístrate aquí!</strong>
                </Link>
              </p>
               <p className='login-message'>
              ¿Olvidaste tu contraseña? <Link to="/forget-password">Haz clic aquí</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
