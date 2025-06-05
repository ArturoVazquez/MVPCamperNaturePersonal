import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import './resetPassword.css';
import { ZodError } from 'zod';
import { changePasswordSchema } from '../../../schemas/changePasswordSchema';


const initialValue = {
  newPassword: '',
  repeatPassword: '',
};

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');
  const [valErrors, setValErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    setSuccessMsg('');
    setErrorMsg('');
    setValErrors({});

    try {
      changePasswordSchema.parse(formData);

      await fetchData(`user/reset-password/${token}`, 'post', formData);
      setSuccessMsg('Contraseña cambiada correctamente. Ya puedes iniciar sesión.');
      setFormData(initialValue);
    } catch (error) {
      if (error instanceof ZodError) {
        let objTemp = {};
        error.errors.forEach((err) => {
          objTemp[err.path[0]] = err.message;
        });
        setValErrors(objTemp);
      } else if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Ha ocurrido un error inesperado. Intenta más tarde.');
      }
    }
  };

  return (
    <section className="reset-section">
      <Container className="container-reset">
        <Row className="w-100 align-items-center text-center">
          <Col md={12} lg={12}>
            <h1 className='reset-title'>Cambia tu contraseña</h1>
            <p className='subtitle-reset'>
              Introduce y confirma tu nueva contraseña segura
            </p>

            <Form className="form-reset">
              <Form.Group className="mb-3">
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                {valErrors.newPassword && <p className='message-error'>{valErrors.newPassword}</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Repite la contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
                {valErrors.repeatPassword && <p className='message-error'>{valErrors.repeatPassword}</p>}
              </Form.Group>

              {errorMsg && <p className="message-error">{errorMsg}</p>}
              {successMsg && <p className="message-confirm">{successMsg}</p>}

              <button type='button' className='reset-buton' onClick={onSubmit}>
                Cambiar contraseña
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ResetPassword;