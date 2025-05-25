import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Container, Alert } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import './resetPassword.css';


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!password || !repPassword) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    if (password !== repPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      await fetchData('user/reset-password', 'post', { token, newPassword: password });
      setMessage('Contraseña actualizada correctamente. Ahora puedes iniciar sesión.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al actualizar la contraseña.');
    }
  };

  return (
    <section className="reset-section d-flex justify-content-center align-items-center">
      <Container className="container-reset">
        <h1 className="text-center mb-4 reset-title">Restablecer Contraseña</h1>

        <Form onSubmit={handleReset}>
          <Form.Group className="mb-3">
            <Form.Label>Nueva contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Repite la contraseña</Form.Label>
            <Form.Control
              type="password"
              value={repPassword}
              onChange={(e) => setRepPassword(e.target.value)}
              required
            />
          </Form.Group>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <button className='reset-buton' type="submit" variant="primary">Restablecer</button>
        </Form>
      </Container>
    </section>
  );
};

export default ResetPassword;
