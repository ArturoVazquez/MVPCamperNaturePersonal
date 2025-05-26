import { Container, Row, Col } from 'react-bootstrap';
import './culture.css';

const Culture = () => {
  return (
    <div className="bg-color-culture py-5">
      <h1 className="fw-bold text-center py-5">
        Cultura, Historia y Tradición
      </h1>
      <section>
        <Container fluid className="px-5">
          <Row className="text-center g-4">
            <Col xs={12} sm={6} md={3}>
              <div className="image-wrapper">
                <img
                  src="/images/culture/castillo.jpg"
                  alt="Visualización de Castillo"
                />
              </div>
              <p className="fw-bold mt-5 fs-2">Raices con Historia</p>
              <p className="fs-4">
                Visita monumentos históricos como el Castillo Mediaval de Alcalá
                de Xivert, La Ermita de Santa Llucia o el imponente Castillo de
                Peñíscola, que desde el siglo XIV se alza sobre el mar.
              </p>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="image-wrapper">
                <img
                  src="/images/culture/mercadillo.jpg"
                  alt="Mercadillo medieval"
                />
              </div>
              <p className="fw-bold mt-5 fs-2">Tradición y Cultura</p>
              <p className="fs-4">
                Vive las festividades y celebraciones populares de la zona.
                Desde mercados medievales, hasta eventos únicos como La Passió
                de Torreblanca, que se celebra cada Semana Santa.
              </p>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="image-wrapper">
                <img
                  src="/images/culture/festival.jpg"
                  alt="Festival de música"
                />
              </div>
              <p className="fw-bold mt-5 fs-2">Ritmos cerca del mar</p>
              <p className="fs-4">
                A pocos minutos se celebran algunos de los festivales
                internacionales más vibrantes, como el FIB, el Rototom Sunsplash
                o el SanSan Festival, todos en Benicàssim.
              </p>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="image-wrapper">
                <img src="/images/culture/paella.jpg" alt="Paella" />
              </div>
              <p className="fw-bold mt-5 fs-2">Gastronomía Local</p>
              <p className="fs-4 pb-5">
                Desde los exquisitos arroces y pescados frescos, hasta nuestras
                alcachofas, naranjas y almendras. Sabores auténticos que apoyan
                la agricultura local.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Culture;
