import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';


const Home = () => {

  const navigate = useNavigate();
  const {token} = useContext(AuthContext);

  const handleReserve = () => {

    if (token) {
      navigate('/user/reserve');
    } else {
      navigate('/login');
    }
  }

  return (
    <section className="home-section">
      <Container className="container-home">
        <Row className="w-100 text-center row-home">
          <Col className="col-home" md={12} lg={12}>
            <div>
              <h1 className='home-title'>CamperNature</h1>
              <h3 className='home-subtitle'>
                "Tu espacio para viajar, descansar y conectar con la naturaleza"
              </h3>
            </div>
            <div className="col2-home d-flex justify-content-center">
              <button onClick={handleReserve} className='button-home'>RESERVA AHORA</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Home;
