import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Container, Row, Col } from 'react-bootstrap';
import 'react-day-picker/style.css';
import { fetchData } from '../../../../helpers/axiosHelper';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContextProvider';

export const Reserve_1 = ({
  firstSelected,
  setFirstSelected,
  secondSelected,
  setSecondSelected,
  reservaData,
  setReservaData,
  setShowReserve,
}) => {
  const { token } = useContext(AuthContext);
  const handleNext = async () => {
    let dates = {
      startDate: format(firstSelected, 'yyyy-MM-dd'),
      endDate: format(secondSelected, 'yyyy-MM-dd'),
    };
    setReservaData({ ...reservaData, ...dates });
    await fetchData(
      'user/checkDates',
      'post',
      { start_date: dates.startDate, end_date: dates.endDate },
      token
    );
  };

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

          <div className="d-flex justify-content-around pt-5">
            <button type="button" onClick={handleNext} className="botones-edit">
              Siguiente
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};
