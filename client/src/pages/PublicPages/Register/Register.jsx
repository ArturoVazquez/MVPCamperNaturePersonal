import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import './register.css';
import { fetchData } from '../../../helpers/axiosHelper.js';
import { Link, replace, useNavigate } from 'react-router-dom';
import { registerSchema } from '../../../schemas/registerSchema';
import { ZodError } from 'zod';

const initialValue = {
  email: '',
  password: '',
  repPassword: '',
};

const Register = () => {
  const [registerData, setRegisterData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');
  const [valErrors, setValErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const onSubmit = async () => {
    //limpiamos mensajes anteriores
    setSuccessMsg('');
    setErrorMsg('');
    setValErrors({});
    //mandar datos al back para guardar
    try {
      registerSchema.parse(registerData);
      await fetchData('user/register', 'post', registerData);

      //muestro mensaje de exito
      setSuccessMsg(
        '¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.'
      );

      //limpiamos los campos
      setRegisterData(initialValue);
    } catch (error) {
      if (error instanceof ZodError) {
        let objTemp = {};
        error.errors.forEach((err) => {
          objTemp[err.path[0]] = err.message;
        });
        setValErrors(objTemp);
      }

      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Ups,ha habiado un error');
      }
    }
  };

  return (
    <section className="register-section">
      <Container className="container-register">
        <Row className="w-100 align-items-center text-center">
          <Col md={12} lg={12}>
            <h1 className='register-title'>No hace falta brújula</h1>
            <p className='subtitle-register'>
              Sigue el formulario y acabarás donde se duerme mejor &mdash; en
              plena naturaleza
            </p>

            <Form className="form-register">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="EmailTextInput">Email</Form.Label>
                <Form.Control
                  id="EmailTextInput"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                />
                {valErrors.email && <p>{valErrors.email}</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="passwordTextInput">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  id="passwordTextInput"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                />
                {valErrors.password && <p>{valErrors.password}</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="RepPasswordTextInput">
                  Repite la contraseña
                </Form.Label>
                <Form.Control
                  type="password"
                  id="RepPasswordTextInput"
                  name="repPassword"
                  value={registerData.repPassword}
                  onChange={handleChange}
                />
                {valErrors.repPassword && <p>{valErrors.repPassword}</p>}
              </Form.Group>
              <p>{errorMsg}</p>
              {successMsg && <p className="message-confirm">{successMsg}</p>}
              <button type='button' className='register-button' onClick={onSubmit}>Registrarse</button>
             
            </Form>
             <p className='message-register'>
                ¿Ya estás registrado?{' '}
                <Link to="/login">
                  <strong>Inicia sesión</strong>
                </Link>{' '}
                <br />
              </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
