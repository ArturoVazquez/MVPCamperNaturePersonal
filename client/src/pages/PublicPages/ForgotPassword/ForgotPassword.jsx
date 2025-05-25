import React, { useState } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import './forgotpassword.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetchData('user/forgot-password', 'post', { email });
      setMessage(response.data.message || 'Revisa tu correo electrónico');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el email');
    }
  };

  return (
    <section className="forgotpassword-section">
      <Container className="mt-5 container-forgotpassword">
        <h1 className="mb-4 text-center forgotpassword-title">¿Olvidaste tu contraseña?</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Introduce tu correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <button className='forgotpassword-buton' variant="primary" type="submit">
            Enviar enlace de recuperación
          </button>
        </Form>

        {message && <Alert variant="success" className="mt-3">{message}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Container>
    </section>
  );
};

export default ForgotPassword;
