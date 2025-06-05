import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Container, Row, Col } from 'react-bootstrap';
import 'react-day-picker/style.css';
import { fetchData } from '../../../../helpers/axiosHelper';
import { useContext, useEffect} from 'react';
import { AuthContext } from '../../../../context/AuthContextProvider';
import './reserve_1.css';
import { ZodError } from 'zod';
import { reservaCalendarSchema } from '../../../../schemas/reservaCalendarSchema';

export const Reserve_1 = ({
  firstSelected,
  setFirstSelected,
  secondSelected,
  setSecondSelected,
  reservaData,
  setReservaData,
  setShowReserve,
  setParcelId,
  message,
  setMessage,
  setTotalDays
}) => {
  const { token } = useContext(AuthContext);
  console.log('mensaje error', message);

  useEffect(()=>{
    setMessage('');
  },[firstSelected, secondSelected])

  const handleNext = async () => {
    
    try {
     
      reservaCalendarSchema.parse({firstSelected, secondSelected})
      let dates = {
        startDate: format(firstSelected, 'yyyy-MM-dd'),
        endDate: format(secondSelected, 'yyyy-MM-dd'),
      };
      setReservaData({ ...reservaData, ...dates });

      let result = await fetchData(
        'user/checkDates',
        'post',
        { start_date: dates.startDate, end_date: dates.endDate, firstSelected, secondSelected },
        token
      );

      
        setParcelId(result.data.parcelId);
        setTotalDays(result.data.numDias);
        setShowReserve(2);
      

      
    } catch (err) {
      console.error('error del calendarReservarpaso1', err);
      if (err instanceof ZodError) {
        let objTemp = err.errors[0].message;
        setMessage(objTemp);
      } else if (err.response) {
        setMessage(err.response.data.message);
      }
      
    }
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
                <div className="footer-centrado">
                  {firstSelected
                    ? `Dia Entrada: ${firstSelected.toLocaleDateString()}`
                    : 'Selecciona las fechas'}
                </div>
              }
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <DayPicker
              captionLayout="dropdown"
              animate
              mode="single"
              selected={secondSelected}
              locale={es}
              onSelect={setSecondSelected}
              disabled={{
                before: new Date(),
              }}
              footer={
                <div className="footer-centrado">
                  {secondSelected
                    ? `Dia Salida: ${secondSelected.toLocaleDateString()}`
                    : 'Selecciona las fechas'}
                </div>
              }
            />
            
          </Col>
          <p className='text-center pt-5 message-error'>{message}</p>
          <div className="d-flex justify-content-around pt-3">
            <button type="button" onClick={handleNext} className="botones-edit mb-4">
              Siguiente
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};
