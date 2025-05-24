import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  return (
    <section className="home-section">
      <Container className="container-home">
        <Row className="w-100 text-center row-home">
          <Col className='col-home' md={12} lg={12}>
            <h1>CamperNature</h1>
            <h3>
              "Tu espacio para viajar, descansar y conectar con la naturaleza"
            </h3>
           <button>RESERVA AHORA</button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Home;
