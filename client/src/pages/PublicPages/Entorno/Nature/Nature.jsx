import { Container, Row, Col } from 'react-bootstrap';
import './nature.css';
const Nature = () => {
  return (
    <div className="bg-color">
      <section className="mb-5">
        <Container>
          <div className="text-center pt-5">
            <h1 className="color-green fw-bold h1-nature">
              Naturaleza en estado puro
            </h1>
            <p className="fs-1 mt-5 color-brown fw-bold">
              ¡Explora un entorno único!
            </p>
            <p className="fs-2 mt-5 color-brown">
              En los alrededores de CamperNature es habitual encontrarse con
              escenas como esta: rebaños de ovejas pastando tranquilamente entre
              los campos. Una estampa que nos recuerda el ritmo pausado de la
              vida rural y el vínculo profundo que existe entre las personas y
              la tierra.
            </p>
          </div>
        </Container>
      </section>
      <section className="mt-5">
        <Container fluid>
          <Row>
            <Col md={12} lg={6} className="g-0">
              <img
                src="/images/static/Nature/oveja2.jpg"
                alt="Oveja entre ovejas"
                className="img-fluid img-nature"
              />
            </Col>
            <Col md={12} lg={6} className="g-0">
              <img
                src="/images/static/Nature/oveja1.jpg"
                alt="Oveja con pastor detrás"
                className="img-fluid img-nature"
              />
            </Col>
          </Row>
        
        </Container>
      </section>
      <section className="mt-5">
        <Container fluid className="p-0 m-0">
          <Row className="g-0">
            <Col
              md={12}
              lg={6}
              className="d-flex align-items-center justify-content-center text-col-cntr"
            >
              <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-5">
                <p className="fs-2 text-center color-brown">
                  Rodeados de extensos campos de almendros, naranjos, alcachofas
                  y otros cultivos tradicionales.
                </p>
                <p className="fs-2 text-center color-brown">
                  Este paisaje cambia con las estaciones, ofreciendo un
                  espectáculo de colores, aromas y sensaciones únicas.
                </p>
              </div>
            </Col>
            <Col md={12} lg={6} className="p-0">
              <div className="d-flex flex-wrap justify-content-center">
                <img
                  src="/images/static/Nature/Almendro.jpg"
                  alt="Árbol de Almendro"
                  className="img-fluid sec-2-image radius-right"
                />
                <img
                  src="/images/static/Nature/Naranjo.jpg"
                  alt="Árbol de Naranjo"
                  className="img-fluid sec-2-image"
                />
         
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-5">
        <Container fluid>
          <Row className="row-gap-3">
            <Col md={12} lg={6} className="g-0">
              <img
                src="/images/static/Nature/atardecer.jpg"
                alt="Caravana en el atardecer"
                className="img-fluid img-nature radius-left"
              />
         
            </Col>
            <Col
              md={12}
              lg={6}
              className="g-0 text-center fs-2 d-flex justify-content-center align-items-center"
            >
              <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-3">
                <p className="mb-5 text-center color-brown">
                  Aquí podrás despertar con el canto de los pájaros y disfrutar
                  de la tranquilidad que solo el campo puede ofrecer.
                </p>
                <p className="text-center color-brown">
                  Este lugar es ideal para senderismo, rutas en bici o
                  simplemente desconectar y respirar aire puro
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-5">
        <Container fluid className="p-0 m-0">
          <Row className="g-0">
            <Col
              md={12}
              lg={6}
              className="d-flex align-items-center justify-content-center text-col-cntr"
            >
              <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-3">
                <p className="fs-2 text-center color-brown">
                  <strong className="espaciado">
                    Descubre CamperNature, dónde el mar y la montaña se
                    encuentran. {''}
                  </strong>
                  Disfruta playas vírgenes, calas escondidas, montañas con
                  vistas infinitas y parques naturales llenos de vida.
                </p>
              </div>
            </Col>
            <Col md={12} lg={6} className="p-0">
              <div className="d-flex flex-wrap justify-content-center">
                <img
                  src="/images/static/Nature/hand.jpg"
                  alt="Imagen de mano pasando por el trigo"
                  className="img-fluid sec-2-image radius-right"
                />
                <img
                  src="/images/static/Nature/parque_natural_SDI.jpg"
                  alt="Imagen de playa"
                  className="img-fluid sec-2-image"
                />
           
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-5">
        <Container fluid>
          <Row className="row-gap-3">
            <Col md={12} lg={6} className="g-0">
              <img
                src="/images/static/Nature/Cala.jpg"
                alt="Oveja entre ovejas"
                className="img-fluid oveja radius-left"
              />
             
            </Col>
            <Col
              md={12}
              lg={6}
              className="g-0 text-center fs-3 d-flex justify-content-center align-items-center"
            >
              <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-3">
                <p className="mb-5 fs-2 text-center color-brown">
                  Adéntrate en los humedales del{' '}
                  <strong>Parque Natural del Prat de Cabanes,</strong> recorre
                  los senderos del{' '}
                  <strong>Parque Natural de la Serra d’Irta</strong> o visita
                  las increibles <strong>Islas Columbretes</strong>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-5">
        <Container fluid>
          <Row className="row-gap-3">
            <Col
              md={12}
              lg={6}
              className="g-0 text-center fs-2 d-flex justify-content-center align-items-center"
            >
              <div className="d-flex flex-column gap-4 text-center text-md-start px-4 py-3">
                <p className="mb-5 text-center color-brown">
                  Las aguas cristalinas de Alcossebre, las playas tranquilas de
                  Torrenostra y las maravillosas calas escondidas de Oropesa del
                  Mar, te esperan.
                </p>
              </div>
            </Col>
            <Col md={12} lg={6} className="g-0">
              <img
                src="/images/static/Nature/Columbretes.jpg"
                alt="Oveja entre ovejas"
                className="img-fluid img-nature radius-right-top"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Nature;
