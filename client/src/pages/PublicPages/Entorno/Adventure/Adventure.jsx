import { Container, Row, Col } from 'react-bootstrap';
import './adventure.css';

const Adventure = () => {
  return (
    <div className="color-bg pt-5">
      <header className="mb-5  text-center">
        <h1 className="title-adventure fw-bold text-white ">
          Aventura y Actividades al aire libre
        </h1>
      </header>

      <section className="mt-5 section1">
        <Container fluid>
          <Row className="row-gap-3">
            <Col md={12} lg={6} className="g-0">
              <img
                src="/images/static/Adventure/cabanes.jpg"
                alt="parque natural de cavanes"
                className="img-fluid img-adventure radius-left"
              />
              <p className="mt-2 fst-italic text-center text-white">
                Parque Natural de Cabanes-Torreblanca
              </p>
            </Col>
            <Col
              md={12}
              lg={6}
              className="g-0 text-center fs-2 d-flex justify-content-center align-items-center"
            >
              <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-3">
                <p className="mb-5 text-center text-white">
                  <strong>¡Aquí no te faltarán planes!</strong>
                </p>
                <p className="text-center text-white">
                  Este lugar es ideal para senderismo, rutas en bici o
                  simplemente desconectar y respirar aire puro
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='section2 mt-5'>
        <Container fluid className='p-0 m-0 '>
          <Row className='g-0'>
            <Col md={12} lg={6} className='d-flex align-items-center justify-content-center text-col-cntr'>
            <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-5">
              <p className="fs-2 text-center text-white">
                Pasea entre campos, disfruta del <strong>cicloturismo slow</strong> entre arboles frutales o explora las rutas de  <strong>Senderismo y BTT</strong> en parajes naturales como la Serra d’Irta, la Sierra de les Santes, el Desierto de las Palmas o el Monte Bobalar.
              </p>
            </div>
            </Col>
             <Col md={12} lg={6} className="p-0">
              <div className="d-flex flex-wrap justify-content-center">
                <img
                  src="/images/static/Adventure/ciclista1.jpg"
                  alt="ciclista"
                  className="img-fluid bicis-img radius-right"
                />
                <img
                  src="/images/static/Adventure/ciclista2.jpg"
                  alt="mujer ciclista"
                  className="img-fluid bicis-img"
                />
                  <p className="mt-2 fst-italic  text-center text-white">
                    Parque Natural Serra d'Irta
                  </p>
              </div>
               
               
            </Col>
          </Row>
        </Container>

      </section>
      <section className='section3 mt-5'>
        <Container fluid className='p-0 m-0 '>
          <Row className='g-0'>
             <Col md={12} lg={6} className="p-0">
              <div className="d-flex flex-wrap justify-content-center">
                <img
                  src="/images/static/Adventure/buceo.jpg"
                  alt="hombre buceo"
                  className="img-fluid buceo-img "
                />
                <img
                  src="/images/static/Adventure/8.jpg"
                  alt="padel surf"
                  className="img-fluid buceo-img radius-left"
                />
             
              </div>
            </Col>
            <Col md={12} lg={6} className='d-flex align-items-center justify-content-center text-col-cntr'>
            <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-5">
              <p className="fs-2 text-center text-white">
                Si prefieres el mar, puedes disfrutar de gran variedad de <strong>Deportes Náuticos</strong>, como Paddle Surf, Vela, Kayak, snorkel, buceo...
                ¡y mucho más!
              </p>
            </div>
            </Col>
            
          </Row>
        </Container>

      </section>
      <section className='section4 mt-5'>
        <Container fluid className='p-0 m-0 '>
          <Row className='g-0'>
            <Col md={12} lg={6} className='d-flex align-items-center justify-content-center text-col-cntr'>
            <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-5">
              <p className="fs-2 text-center text-white">
                Si eres amante de las aves, el <strong>Parque Natural del Prat de Cabanes - Torreblanca</strong> es el lugar ideal para practicar <strong>Birdwatching</strong>, un verdadero paraíso para los ornitólogos
              </p>
            </div>
            </Col>
             <Col md={12} lg={6} className="p-0">
              <div className="d-flex flex-wrap justify-content-center">
                <img
                  src="/images/static/Adventure/pato.jpg"
                  alt="pato volando"
                  className="img-fluid bicis-img radius-right"
                />
                <img
                  src="/images/static/Adventure/prismaticos.avif"
                  alt="chicas mirando por prismáticos"
                  className="img-fluid bicis-img"
                />
                <p className="mt-2 fst-italic text-center text-white texto-centrado">
                  Evento Geoaching Torreblanca
                </p>
              </div>
            </Col>
          </Row>
        </Container>

      </section>
       <section className="section5 mt-5">
        <Container fluid>
          <Row className="row-gap-3">
            <Col md={12} lg={6} className="g-0">
              <img
                src="/images/static/Adventure/mapa1.avif"
                alt="hombre mirando mapa"
                className="img-fluid img-mapa radius-left"
              />
       
            </Col>
            <Col
              md={12}
              lg={6}
              className="g-0 text-center fs-2 d-flex justify-content-center align-items-center"
            >
              <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-3">
                <p className="mb-5 text-center text-white">
                  Y si te gusta la aventura! Torreblanca es la sede de grandes eventos oficiales de <strong>Geocaching.</strong>
                </p>
                <p className="text-center text-white">
                  Aquí podrás practicar esta divertida búsqueda del tesoro con GPS, ¡entre otras muchas actividades!
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default Adventure;
