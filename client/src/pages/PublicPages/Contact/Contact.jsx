import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { contactSchema } from '../../../schemas/contactSchema';
import { ZodError } from 'zod';
import { fetchData } from '../../../helpers/axiosHelper';
import './contact.css';

const initialValue = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
  const [contactData, setContactData] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [msgSuccess, setMsgSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      contactSchema.parse(contactData);
      await fetchData('user/contact', 'post', contactData);
      setMsgSuccess(true);
      setValErrors({});
      setContactData(initialValue);
    } catch (error) {
      if (error instanceof ZodError) {
        let objTemp = {};
        error.errors.forEach((er) => {
          objTemp[er.path[0]] = er.message;
        });
        setValErrors(objTemp);
        setMsgSuccess(false);
      }
    }
  };

  return (
    <div>
      <Container>
        <Row className="mt-5">
          <Col>
            <h2 className="h2-form text-center">Formulario de contacto</h2>
            <Form className="text-center fw-bold ">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="text-brown">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={contactData.name}
                />
                {valErrors.name && (
                  <p className="text-danger">{valErrors.name}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-brown">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={contactData.email}
                />
                {valErrors.email && (
                  <p className="text-danger">{valErrors.email}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Label className="text-brown">Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  onChange={handleChange}
                  value={contactData.message}
                />
                {valErrors.message && (
                  <p className="text-danger">{valErrors.message}</p>
                )}
              </Form.Group>
              {msgSuccess && (
                <p className="text-success">
                  Mensaje enviado correctamente, nos pondremos en contacto lo
                  más rapido posible
                </p>
              )}
              <Button
                variant="primary"
                onClick={onSubmit}
                className="form-button"
              >
                Enviar
              </Button>
            </Form>
          </Col>
          <Col>AQUI IRÁ EL GOOGLE MAPS ETCETC</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
