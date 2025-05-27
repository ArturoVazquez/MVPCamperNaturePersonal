import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css';
const Footer = () => {
  return (
    <section className="section-footer">
      <Container>
        <Row className="row-cols-1 row-cols-md-3 row-cols-lg-3 text-center">
          <Col className='d-flex align-items-center justify-content-center'>
            <article>
              <h3>Contacto</h3>
              <p>Teléfono:</p>
              <p>hola@campernature.com</p>
            </article>
          </Col>
          <Col  className='d-flex align-items-center justify-content-center'>
            <div className='image'>
              <img src="/images/logo2.png" alt="logo" />
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-center'>
            <article className='d-flex flex-column aviso'>
              <a>Aviso Legal</a>
              <a>Privacidad</a>
              <a>Política de Cookies</a>
            </article>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
