import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './tarifas.css';
import { getAllServices } from '../../../helpers/axiosHelper';

const Tarifas = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const cachedServices = sessionStorage.getItem('services');
    if (cachedServices) {
      setServices(JSON.parse(cachedServices));
    } else {
      const fetchServices = async () => {
        try {
          const data = await getAllServices(); //
          setServices(data);
          sessionStorage.setItem('services', JSON.stringify(data));
        } catch (error) {
          console.error('Error cargando servicios:', error);
        }
      };
      fetchServices();
    }
  }, []);

  const serviciosIncluidos = services.filter((s) => !s.is_included);
  const serviciosExtra = services.filter((s) => s.is_included);
  const temporadaAlta = services.find((s) => s.name === 'Temporada Alta');
  const temporadaBaja = services.find((s) => s.name === 'Temporada Baja');

  return (
    <section className="rate-section">
      <Container>
        <h2 className="text-center title-rate mb-4">Nuestras Tarifas</h2>
        <Row className="mb-4 align-items-center justify-content-center row-gap-2">
          <Col lg={4} md={12} xs={12} className="price-included">
            <div className="box-price">
              <p className="title-price">El precio incluye:</p>
              <ul>
                {serviciosIncluidos
                  .filter(
                    (servicio) =>
                      servicio.name !== 'Temporada Alta' &&
                      servicio.name !== 'Temporada Baja'
                  )
                  .map((servicio) => (
                    <li key={servicio.service_id}>{servicio.name}</li>
                  ))}
              </ul>
            </div>
          </Col>

          <Col lg={4} md={6} xs={12} className="rate-cols">
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
            {temporadaAlta && (
              <div className="rate-box mb-3">
                <p className="title-price">{temporadaAlta.name}</p>
                <p>{temporadaAlta.description}</p>
                <p className="price-text">
                  <strong>{temporadaAlta.price} € / día</strong>
                </p>
              </div>
            )}
            {temporadaBaja && (
              <div className="rate-box mb-3">
                <p className="title-price">{temporadaBaja.name}</p>
                <p>{temporadaBaja.description}</p>
                <p className="price-text">
                  <strong>{temporadaBaja.price} € / día</strong>
                </p>
              </div>
            )}
          </Col>
        </Row>

        <h2 className="text-center mb-4 mt-5 title-rate">Servicios Extra</h2>
        <Row className="text-center extra-services row-gap-4">
          {serviciosExtra.map((servicio) => (
            <Col
              key={servicio.service_id}
              lg={4}
              md={12}
              xs={12}
              className="rate-cols"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/service/${
                  servicio.service_img
                }`}
                alt={servicio.name}
                className="img-fluid"
              />
              <div className="rate-box-2">
                <p className="service-text">{servicio.name}</p>
                <p className="price-text">
                  <strong>{servicio.price} € / día</strong>
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Tarifas;
