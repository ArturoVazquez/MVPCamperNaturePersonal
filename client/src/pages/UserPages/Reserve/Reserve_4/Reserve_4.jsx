import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const Reserve_4 = ({ userDetails, reservaData, totalDays }) => {
  const [price, setPrice] = useState([]);

  useEffect(() => {
    const calculatePriceTotal = () => {
      const totalExtras = reservaData?.serviceNoIncluded.reduce(
        (acc, s) => acc + s.amount * s.price,
        0
      );

      setPrice(totalExtras);
    };
   calculatePriceTotal();
   
  }, []);
  return (
    <section>
      <Container>
        <p>Paso 4 de 4</p>
        <h2 className="text-center fw-semibold">Resumen de la Reserva</h2>
        <Row>
          <Col>
            <article>
              <p>Resumen de contacto</p>
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
                <strong>Fecha de nacimiento:</strong> {userDetails?.birth_date}
              </p>
              <p>
                <strong>Dirección:</strong> {userDetails?.address}
              </p>
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
          <Col>
            <Row className="row-cols-1">
              <Col>
                <article>
                  <p>Servicios Contratados</p>
                  {reservaData?.serviceNoIncluded.map((elem) => {
                    return (
                      <p
                        key={elem.service_id}
                      >{`${elem.name}: ${elem.amount}`}</p>
                    );
                  })}
                </article>
              </Col>
              <Col>
                <p>Reserva Confirmada:</p>
                <p>Check-in: {reservaData.startDate}</p>
                <p>Check-out: {reservaData.endDate}</p>
                <p>Precio Total: {price} </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
