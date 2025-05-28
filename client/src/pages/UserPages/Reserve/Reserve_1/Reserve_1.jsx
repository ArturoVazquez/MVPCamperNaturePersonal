import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Container, Row, Col } from 'react-bootstrap';
import 'react-day-picker/style.css';

const Reserve_1 = () => {
  const [firstSelected, setFirstSelected] = useState();
  return (
    <div>
      <h1 className="text-center mt-5">
        Tu aventura comienza aquí: ¡Reserva tu lugar en la naturaleza!
      </h1>
      <Container>
        <Row className="pt-5">
          <Col className="d-flex justify-content-center">
            <DayPicker
              captionLayout="dropdown"
              animate
              mode="single"
              selected={firstSelected}
              onSelect={setFirstSelected}
              disabled={{
                before: new Date(),
              }}
              footer={
                firstSelected
                  ? `Dia seleccionado: ${firstSelected.toLocaleDateString()}`
                  : 'Selecciona las fechas'
              }
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <DayPicker
              captionLayout="dropdown"
              animate
              mode="single"
              selected={firstSelected}
              onSelect={setFirstSelected}
              disabled={{
                before: new Date(),
              }}
              footer={
                firstSelected
                  ? `Dia seleccionado: ${firstSelected.toLocaleDateString()}`
                  : 'Selecciona las fechas'
              }
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Reserve_1;

{
  /* <div className="pt-5">
        <DayPicker
          captionLayout="dropdown"
          animate
          mode="single"
          selected={firstSelected}
          onSelect={setFirstSelected}
          disabled={{
            before: new Date(),
          }}
          footer={
            firstSelected
              ? `Dia seleccionado: ${firstSelected.toLocaleDateString()}`
              : 'Selecciona las fechas'
          }
        />
      </div>
      <div className="pt-5">
        <DayPicker
          captionLayout="dropdown"
          animate
          mode="single"
          selected={firstSelected}
          onSelect={setFirstSelected}
          disabled={{
            before: new Date(),
          }}
          footer={
            firstSelected
              ? `Dia seleccionado: ${firstSelected.toLocaleDateString()}`
              : 'Selecciona las fechas'
          }
        />
      </div>div */
}
