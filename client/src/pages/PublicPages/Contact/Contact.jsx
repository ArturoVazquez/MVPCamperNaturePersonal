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
    <div className="body-contact">
      <section className="pt-5">
        <Container>
          <h1 className="mb-2 text-center color-green fw-semibold">Contacto</h1>
          <Row className="py-5">
            <Col className="px-5" xs={12} md={6} lg={6} xl={6}>
              <h2 className="mb-4 text-center color-green fw-semibold">
                Donde encontrarnos
              </h2>
              <div className="ratio ratio-16x9 mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d101767.48911520388!2d-3.694213433835436!3d37.147134279446966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0xd71fb706506b77f%3A0x8e99ed521340a5ca!2sAv.%20de%20las%20Palmeras%2C%2075%2C%2018100%20Armilla%2C%20Granada%2C%20Espa%C3%B1a!3m2!1d37.1471628!2d-3.6118124!5e0!3m2!1ses!2sde!4v1748335342024!5m2!1ses!2sde"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación en Google Maps"
                />
              </div>
              <div className="pb-5">
                <h2 className="mt-4 color-green fw-semibold">Ubicación</h2>
                <p>
                  CamperNature está ubicado en pleno corazón de la{' '}
                  <strong>Costa de Azahar,</strong> dentro del tranquilo y
                  encantador municipio de Torreblanca. Nuestra ubicación combina
                  comodidad y naturaleza, ideal para amantes del mar y la
                  tranquilidad.
                </p>
                <p>
                  Nos encontramos en la zona de <strong>Cap i Corp,</strong> un
                  paraje de gran valor ecológico y belleza natural, a solo 1,5
                  km de la playa. La zona conserva su carácter salvaje y
                  auténtico, ofreciendo un entorno único para desconectar.
                </p>
                <p>
                  Estamos perfectamente conectados, mediante{' '}
                  <strong>acceso directo a la autopista AP-7</strong> y nos
                  encontramos a pocos minutos de las playas de Torrenostra y
                  Alcossebre.
                </p>
                <p>
                  Rodeados de almendros, naranjos y campos de cultivo
                  tradicionales, en CamperNature promovemos un turismo
                  consciente, dónde el bienestar personal y el respeto por el
                  entorno van de la mano.
                </p>
              </div>
            </Col>
            <Col className="px-5" xs={12} md={6} lg={6} xl={6}>
              <div>
                <h2 className="h2-form text-center mb-4 fw-semibold">
                  Formulario de contacto
                </h2>
                <Form className="fw-bold">
                  <Form.Group className="mb-2" controlId="formBasicName">
                    <Form.Label className="text-brown">Nombre:</Form.Label>
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
                  <Form.Group className="mb-2" controlId="formBasicEmail">
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
                  <Form.Group className="mb-2" controlId="formBasicMessage">
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
                      Mensaje enviado correctamente, nos pondremos en contacto
                      lo más rapido posible
                    </p>
                  )}
                  <button className="botones" onClick={onSubmit}>
                    Enviar
                  </button>
                </Form>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-center mt-5 text-center gap-4">
                <div>
                  <h3 className="color-green fw-semibold">
                    Información y reservas
                  </h3>
                  <p>Teléfono: +34 958 888 888</p>
                  <p>Email: hola@campernature.com</p>
                  <p>Web: www.campernature.com</p>
                </div>
                <div>
                  <h3 className="color-green fw-semibold">Horario</h3>
                  <p>Recepción: 08:00 - 14:00 / 16:00 - 20:00</p>
                  <p>Tienda: 08:00 - 22:00</p>
                  <p>Bar: 10:00 - 23:00</p>
                </div>
              </div>
              <div className="pb-5">
                <h3 className="mt-5 text-center fw-semibold color-green">
                  No te pierdas las novedades
                </h3>
                <div className="d-flex justify-content-center gap-5 mt-3 social-icons">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-facebook fs-4 text-primary"></i>
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-twitter-x fs-4 text-dark"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/campernaturearea/#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-instagram fs-4 text-danger"></i>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
