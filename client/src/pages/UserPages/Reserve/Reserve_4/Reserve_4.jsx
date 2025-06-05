import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { datesCalculator } from '../../../../helpers/datesCalculator';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './reserve_4.css';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'boton-confirmar',
    cancelButton: 'boton-cancelar',
  },
  buttonsStyling: false,
});

export const Reserve_4 = ({
  userDetails,
  reservaData,
  totalDays,
  cancel,
  setShowReserve,
  parcelId,
  message,
  setMessage,
}) => {
  const [price, setPrice] = useState([]);
  const [days, setDays] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatePriceTotal = () => {
      const totalExtras = reservaData?.serviceNoIncluded.reduce(
        (acc, s) => acc + s.amount * (s.price * totalDays),
        0
      );
      let priceTotalDays = datesCalculator(
        reservaData.startDate,
        reservaData.endDate
      );

      const { formattedDays, priceTotal } = priceTotalDays;
      setPrice(totalExtras + priceTotal);
      setDays(formattedDays);
    };

    calculatePriceTotal();
  }, []);

  const handleFinish = async () => {
    const result = await swalWithBootstrapButtons.fire({
      title: '¿Confirmar reserva?',
      text: 'Una vez confirmada, se guardará tu viaje :)',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await fetchData(
          'user/reserveDone',
          'post',
          { reservaData, price, parcelId, days },
          token
        );
        await swalWithBootstrapButtons.fire({
          title: '¡Reserva confirmada!',
          text: 'Tu reserva se ha realizado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        navigate('/user/profile');
      } catch (error) {
        console.error(error);
        await swalWithBootstrapButtons.fire({
          title: 'Error',
          text: 'No se pudo confirmar la reserva. Intenta más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: 'Reserva cancelada',
        text: 'Tu aventura aún puede esperar.',
        icon: 'info',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  return (
    <>
      <section className='reserva4'>
        <Container >
          <p className="mt-5 paso2">Paso 4 de 4</p>
          <h2 className="text-center fw-semibold title-service pb-4">
            Resumen de la Reserva
          </h2>
          <Row className="reserve4-1">
            <p className="title-p text-center">
              <strong>Resumen de contacto</strong>
            </p>
            <Col className="col-12 col-lg-6">
              <article className="mt-4">
                <p>
                  <strong>Nombre:</strong> {userDetails?.name}
                </p>
                <p>
                  <strong>Apellidos:</strong> {userDetails?.lastname}
                </p>
                <p>
                  <strong>Telefono de contacto:</strong> {userDetails?.prefix}{' '}
                  {userDetails?.phone}
                </p>
                <p>
                  <strong>Fecha de nacimiento:</strong>{' '}
                  {userDetails?.birth_date}
                </p>
                <p>
                  <strong>Dirección:</strong> {userDetails?.address}
                </p>
              </article>
            </Col>
            <Col className="col-12 col-lg-6">
              <article className="mt-4">
                <p>
                  <strong>Documento:</strong> {userDetails?.document_type}{' '}
                  {userDetails?.document_number}
                </p>
                <p>
                  <strong>País:</strong> {userDetails?.country}
                </p>
                <p>
                  <strong>Matrícula del coche:</strong>{' '}
                  {userDetails?.car_registration}
                </p>
                <p>
                  <strong>Modelo del coche:</strong> {userDetails?.car_brand}
                </p>
              </article>
            </Col>
          </Row>
          <Row className="preferences my-4">
            <div>
              <p className='pt-2'>
                <strong>Preferencias:</strong> 
              </p>
              <p className='pb-2'>
               {reservaData?.preferences}
              </p>
            </div>
          </Row>
        </Container>
      </section>
      <section>
        <Container >
          <Row className="row-cols-1 row-cols-lg-2 reserve4-2">
            <Col >
              <article>
                <p className="title-p">
                  <strong>Servicios Contratados</strong>
                </p>
                {reservaData?.serviceNoIncluded.map((elem) => {
                  return (
                      <p key={elem.service_id}>{`${elem.name}(${
                        elem.price
                      }€/día): ${elem.amount} x ${totalDays} días = ${
                        elem.amount * (totalDays * elem.price)
                      }€`}</p>
                   
                  );
                })}
              </article>
            </Col>
            <Col >
              <article>
                <p className="title-p">
                  <strong>Reserva Confirmada</strong>
                </p>
                <p>
                  <strong>Check-in:</strong> {reservaData.startDate}
                </p>
                <p>
                  <strong>Check-out:</strong> {reservaData.endDate}
                </p>
                <p>
                  <strong>Precio Total:</strong> {price}€
                </p>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <div className="d-flex justify-content-around py-5">
              <button
                type="button"
                className="botones-edit"
                onClick={() => setShowReserve(3)}
              >
                Anterior
              </button>
              <button type="button" onClick={cancel} className="botones-edit">
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="botones-edit"
              >
                Confirmar
              </button>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};
