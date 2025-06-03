import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'react-day-picker/style.css';
import { datesCalculator } from '../../../helpers/datesCalculator';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-success',
  },
  buttonsStyling: false,
});

const EditReserveAdmin = () => {
  const { token } = useContext(AuthContext);
  const [firstSelected, setFirstSelected] = useState();
  const [secondSelected, setSecondSelected] = useState();
  const [days, setDays] = useState({});
  const [message, setMessage] = useState('');
  const [totalDays, setTotalDays] = useState([]);
  const [booking, setBooking] = useState({});
  const [newPriceDays, setNewPriceDays] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const navigate = useNavigate();
  console.log(booking);
 

  const { booking_id } = useParams();

  useEffect(() => {
    const getBookigById = async () => {
      const result = await fetchData(
        `admin/getBookigById/${booking_id}`,
        'get',
        null,
        token
      );
      setBooking(result.data.priceTotalBooking[0]);
    };
    getBookigById();
  }, []);

  useEffect(() => {
    if (firstSelected && secondSelected) {
      let dates = {
        startDate: format(firstSelected, 'yyyy-MM-dd'),
        endDate: format(secondSelected, 'yyyy-MM-dd'),
      };

      setDays(dates);

      let priceTotalDays = datesCalculator(dates.startDate, dates.endDate);
      const { priceTotal, formattedDays } = priceTotalDays;
      setTotalDays(formattedDays);
      setNewPriceDays(priceTotal);
      let priceServiceNoInclued = booking.total_servicios_no_incluidos;
      setTotalPrice(priceTotal + parseInt(priceServiceNoInclued));
    }
  }, [firstSelected, secondSelected]);

  const handleEdit = async () => {
    setMessage('');
    const result = await swalWithBootstrapButtons.fire({
      title: '¿Está seguro de querer modificar la reserva?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, modificar reserva',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await fetchData(
          'admin/updateReserve',
          'put',
          {
            start_date: days.startDate,
            end_date: days.endDate,
            booking_id,
            totalPrice,
            totalDays,
          },
          token
        );
        await swalWithBootstrapButtons.fire({
          title: '¡Modificado!',
          text: 'Tu reserva ha sido modificada.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        navigate('/admin/reserves')
      } catch (error) {
        console.log('error del front editReservaAdmin', error);
        await swalWithBootstrapButtons.fire({
          title: 'Error',
          text: 'No se pudo modificar la reserva. Intenta más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: 'Acción Cancelada',
        text: 'Tu viaje hacia la desconexión continúa :)',
        icon: 'info',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5">Modifica la fecha de la reserva</h1>
      <Container>
        <Row className="pt-5">
          <Col className="d-flex flex-column gap-5 justify-content-center">
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
            <article>
              <p>Reserva Actual</p>
              <p><strong>Check-in:</strong> {booking.start_date} a las 12h</p>
              <p><strong>Check-out:</strong> {booking.end_date} a las 12h</p>
              <p><strong>Precio total servicios contratados:</strong> {booking.total_servicios_no_incluidos}€</p>
              <p><strong>Precio total:</strong> {booking.total_reserva}€</p>
            </article>
          </Col>
          <Col className="d-flex flex-column gap-5 justify-content-center">
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
            <article>
              <p>Nueva Reserva</p>
              <p><strong>Check-in:</strong> {
                days.startDate !== undefined ? days.startDate : ''
              } </p>
              <p><strong>Check-out:</strong> {
                days.endDate !== undefined ? days.endDate : ''
              }</p>
              <p><strong>Precio total servicios contratados:</strong> {booking.total_servicios_no_incluidos}€</p>
              <p><strong>Precio total:</strong> {
                totalPrice !== undefined ? totalPrice + '€' : ''
              }</p>
            </article>
          </Col>
          
        </Row>
        <div className="d-flex justify-content-around py-5">
            <button type="button" onClick={handleEdit} className="botones">
              Aceptar
            </button>
            <button type="button" onClick={()=>navigate('/admin/reserves')} className="botones">
              Cancelar
            </button>
          </div>
      </Container>
    </div>
  );
};

export default EditReserveAdmin;
