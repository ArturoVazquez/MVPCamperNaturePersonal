import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper.js';
import { forgetPasswordSchema } from '../../../schemas/forgetPasswordSchema.js';
import { ZodError } from 'zod';
import './forgetpassword.css'

const initialValue = {
  email: '',
};

const ForgetPassword = () => {
  const [formData, setFormData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');
  const [valErrors, setValErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    // ñimpiamos mensajes anteriores
    setSuccessMsg('');
    setErrorMsg('');
    setValErrors({});

    try {
      forgetPasswordSchema.parse(formData);

      await fetchData('user/forget-password', 'post', formData);

      setSuccessMsg('Revisa tu correo para cambiar la contraseña');
      setFormData(initialValue);
    } catch (error) {
      if (error instanceof ZodError) {
        let objTemp = {};
        error.errors.forEach((err) => {
          objTemp[err.path[0]] = err.message;
        });
        setValErrors(objTemp);
        return; // evitamos mostrar el mensaje generico
      }

      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        // solo mostramos el mensaje generico si es un fallo inesperado
        setErrorMsg('Ups, ha habido un error');
      }
    }
  };

  return (
    <section className="forgetpassword-section">
      <Container className="container-forgetpassword">
        <Row className="w-100 align-items-center text-center">
          <Col md={12} lg={12}>
            <h1 className="forgetpassword-title">¿Olvidaste tu contraseña?</h1>
            <p className="subtitle-password">
              Introduce tu correo para enviarte un enlace de recuperación.
            </p>

            <Form className="form-password">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="EmailTextInput">Email</Form.Label>
                <Form.Control
                  id="EmailTextInput"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='example@email.com'
                />
                {valErrors.email && <p>{valErrors.email}</p>}
              </Form.Group>

              {errorMsg && <p>{errorMsg}</p>}
              {successMsg && <p className="message-confirm">{successMsg}</p>}

              <button type="button" className="forgetpassword-buton" onClick={onSubmit}>
                Enviar enlace
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ForgetPassword;
