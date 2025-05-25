import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './tarifas.css';

const Tarifas = () => {
  return (
    <section className="rate-section">
      <Container>
        <h2 className="text-center title-rate mb-4">Nuestras Tarifas</h2>
        <Row className="mb-4 align-items-center justify-content-center row-gap-2">
          <Col lg={4} md={12} xs={12} className="price-included">
            <div className='box-price'>
              <p className='title-price'>El precio incluye:</p>
              <ul>
                <li>Parcela para 1 caravana</li>
                <li>2 personas.</li>
                <li>Aseos y duchas con agua caliente.</li>
                <li>Carga de agua potable y vaciado.</li>
                <li>Niños/as de hasta 3 años.</li>
                <li>1 mascota.</li>
                <li>Wifi en zonas comunes.</li>
              </ul>
            </div>
          </Col>

          <Col lg={4} md={6} xs={12} className='rate-cols' >
            <img
              src="/images/mujer-camper.jpg"
              alt="Mujer en un camper"
              className="img-fluid mb-3"
            />
            <img
              src="/images/perro-silla.jpg"
              alt="Perro sentado en una silla"
              className="img-fluid"
            />
          </Col>

          <Col lg={4} md={6} xs={12} className="price-included">
            <div className="rate-box mb-3">
              <p className='title-price'>Temporada alta</p>
              <p>Julio, Agosto, Semana Santa y San Juan</p>
              <p className='price-text'><strong>20 € / día</strong></p>
            </div>
            <div className="rate-box mb-3">
              <p className='title-price'>Temporada baja</p>
              <p>Resto del año</p>
              <p className='price-text'><strong>15 € / día</strong></p>
            </div>
          </Col>
        </Row>

        <h2 className="text-center mb-4 mt-5 title-rate">Servicios Extra</h2>
        <Row className="text-center extra-services">
          <Col lg={4} md={12} xs={12} className='rate-cols'>
            <img src="/images/electricidad.jpg" alt="Bombilla" className="img-fluid" />
            <div className='rate-box-2'>
              <p className='service-text'>Electricidad</p>
              <p className='price-text'><strong>5 € / día</strong></p>
            </div>
          </Col>
          <Col lg={4} md={12} xs={12} className='rate-cols'>
            <img src="/images/persona-extra.jpg" alt="Persona extra" className="img-fluid" />
            <div className='rate-box-2'>
              <p className='service-text'>Persona Extra (+ 3 años)</p>
              <p className='price-text'><strong>5 € / día</strong></p>
            </div>
          </Col>
          <Col lg={4} md={12} xs={12} className='rate-cols'>
            <img src="/images/vaciado.jpg" alt="Imágen de un camper" className="img-fluid" />
            <div className='rate-box-2'>
              <p className='service-text'>Vaciado sin estancia</p>
              <p className='price-text'><strong>5 € / día</strong></p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Tarifas;
