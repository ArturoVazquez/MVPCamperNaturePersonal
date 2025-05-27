import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import './camperNature.css';
export const CamperNature = () => {
  return (
    <>
      <section className="section-1">
        <Container>
          <Row className="g-3">
            <Col className="col-12 col-lg-6 text-center d-flex align-items-center">
              <article className="px-2">
                <h2 className="fw-semibold py-3">El Origen de CamperNature</h2>
                <p>
                  CamperNature nace de la pasión por viajar en furgonetacamper y
                  el amor por la naturaleza. Es así como nace esta camper área,
                  ubicada en un entorno rural, entre el mar y lamontaña.
                  CamperNature busca ofrecer a quienes viajan, una experiencia
                  enriquecedora, combinando la comodidad, con la conexión con la
                  naturaleza y un profundo respeto por el entorno.
                </p>
                <p>
                  Ubicada en la impresionante Costa de Azahar, en elpequeño
                  municipio de Torreblanca (Castellón), CamperNature nace de un
                  fuerte arraigo familiar y el deseo de compartir este lugar
                  especial. Aquí, cada persona viajera encuentra un espacio
                  acogedor y sostenible, ideal para hacer una pausa, disfrutar y
                  reconectar con la naturaleza
                </p>
              </article>
            </Col>

            <Col className="col-12 col-lg-6 d-flex align-items-center">
              <img src="/images/oveja.jpg" alt="oveja" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-2">
        <Container>
          <h2 className="text-center fw-semibold py-3">Nuestros Valores</h2>
          <Row className="row-cols-1  row-cols-lg-4 py-3">
            <Col>
              <article>
                <div className="pb-2 image">
                  <img src="/images/sos.jpg" alt="foto" />
                </div>
                <div>
                  <span>Sotenibilidad</span>
                  <p>
                    Reducción del impacto ambiental, gestión eficiente y consumo
                    responsable de los recurso
                  </p>
                </div>
              </article>
            </Col>
            <Col>
              <article>
                <div className="pb-2 image">
                  <img src="/images/bien.jpg" alt="foto" />
                </div>
                <div>
                  <span>Bienestar</span>
                  <p>
                    Fomentamos la actividad física y habilitamos espacios para
                    la meditación y la relajación
                  </p>
                </div>
              </article>
            </Col>
            <Col>
              <article>
                <div className="pb-2 image">
                  <img src="/images/resp.jpg" alt="foto" />
                </div>
                <div>
                  <span>Respeto</span>
                  <p>
                    Promovemos un ambiente pacífico e inclusivo, donde todas las
                    personas sean bienvenidas
                  </p>
                </div>
              </article>
            </Col>
            <Col>
              <article>
                <div className=" pb-2 image">
                  <img src="/images/vida.jpg" alt="foto" />
                </div>
                <div>
                  <span>Agricultura y vida rural</span>
                  <p>Acercamos a las personas viajeras al mundo rural</p>
                </div>
              </article>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-3">
        <Container>
          <h2 className="fw-semibold">Espacios y Servicios</h2>
          <p>
            CamperNature no es solo un lugar donde aparcar. Es una pausa. Un
            espacio donde reconectar con la naturaleza, descansar y vivir el
            turismo de forma más consciente. Rodeado de naturaleza, cultivos
            locales y calma rural, aquí cada detalle está pensado para ofrecerte
            una experiencia de descanso real, conexión auténtica y bienestar.
          </p>
          <Row className="row-cols-2 row-cols-md-5 row-cols-lg-5 g-3 py-4">
            <Col>
              <article>
                <div>
                  <img src="/images/electric.png" alt="foto" />
                </div>
                <p>SUMINISTRO ELECTRICO</p>
              </article>
            </Col>
            <Col>
              <article>
                <div>
                  <img src="/images/water.png" alt="foto" />
                </div>
                <p>AGUA POTABLE</p>
              </article>
            </Col>
            <Col>
              <article>
                <div>
                  <img src="/images/camper.png" alt="foto" />
                </div>
                <p>PUNTO DE VACIADO</p>
              </article>
            </Col>
            <Col>
              <article>
                <div>
                  <img src="/images/shower.png" alt="foto" />
                </div>
                <p>DUCHAS CON AGUA CALIENTE</p>
              </article>
            </Col>
            <Col>
              <article>
                <div>
                  <img src="/images/wc.png" alt="foto" />
                </div>
                <p>BAÑOS INDEPENDIENTES</p>
              </article>
            </Col>
            <Col>
              <article>
                <div>
                  <img src="/images/wifi.png" alt="foto" />
                </div>
                <p>ZONAS INDEPENDIENTES CON WIFI</p>
              </article>
            </Col>
            <Col>
              <article>
                <div>
                  <img src="/images/work.png" alt="foto" />
                </div>
                <p>CO-WORKING</p>
              </article>
            </Col>
            <Col>
              <article>
                <div>
                  <img src="/images/yoga.png" alt="foto" />
                </div>
                <p>ESPACIO BIENESTAR</p>
              </article>
            </Col>
            <Col>
              <article>
                <div>
                  <img src="/images/picnic.png" alt="foto" />
                </div>
                <p>ZONA PICNIC</p>
              </article>
            </Col>
            <Col>
              <article>
                <div>
                  <img src="/images/pet.png" alt="FOTO" />
                </div>
                <p>PET FRIENDLY</p>
              </article>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-4">
        <Container>
          <Row>
            <Col className="col-12 col-lg-6 d-flex flex-column justify-content-center">
              <article >
                <h2 className='fw-semibold pb-3'>Tu espacio, Tu ritmo</h2>
                <p>
                  En CamperNature disponemos de <span className='fw-semibold'>
                    56 plazas, de entre 50m2 y 60m2,
                    pensadas para autocaravanas y furgonetas camper
                  </span>, ubicadas en
                  un entorno rural y tranquilo.
                </p>
                <p>
                  Todas las plazas están rodeadas de árboles en fase de
                  crecimiento, que ofrecerán sombra en el futuro. Tu pausa
                  perfecta en el camino.
                </p>
              </article>
            </Col>
            <Col className="col-12 col-lg-6">
              <div>
                <img src="/images/camperFondo.jpg" alt="foto" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CamperNature;
