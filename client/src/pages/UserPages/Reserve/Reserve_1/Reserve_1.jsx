
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Container, Row, Col } from 'react-bootstrap';
import 'react-day-picker/style.css';



export const Reserve_1 = ({firstSelected, setFirstSelected, secondSelected, setSecondSelected, reservaData, setReservaData, setShowReserve}) => {
  
  

  const handleNext = () => {
    let dates = {
      startDate: format(firstSelected, 'dd/MM/yyyy'),
      endDate: format(secondSelected, 'dd/MM/yyyy')
    }
    setReservaData({...reservaData, ...dates})
    console.log('reservaData', reservaData);
  }
  
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
              locale={es}
              onSelect={setFirstSelected}
              disabled={{
                before: new Date(),
              }}
              footer={
                firstSelected
                  ? `Dia Entrada: ${firstSelected.toLocaleDateString()}`
                  : 'Selecciona las fechas'
              }
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <DayPicker
              captionLayout="dropdown"
              animate
              mode="single"
              locale={es}
              selected={secondSelected}
              onSelect={setSecondSelected}
              disabled={{
                before: new Date(),
              }}
              footer={
                secondSelected
                  ? `Dia Salida: ${secondSelected.toLocaleDateString()}`
                  : 'Selecciona las fechas'
              }
            />
          </Col>
          
          <div className='d-flex justify-content-around pt-5'>
             
                <button type="button" onClick={handleNext}  className="botones-edit">
                  Siguiente
                </button>
            </div>
          
        </Row>
      </Container>
    </div>
  );
};




