import React, { useContext, useEffect, useState } from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { fetchData } from '../../helpers/axiosHelper';
import { AuthContext } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-success',
  },
  buttonsStyling: false,
});

export const CardReserve = ({ booking_id, startDate, endDate, onDeleted }) => {
  const { token } = useContext(AuthContext);
  const [reserveService, setReserveService] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getReserveService = async () => {
      try {
        let result = await fetchData(
          'user/getReserveService',
          'post',
          { booking_id },
          token
        );
        setReserveService(result.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    getReserveService();
  }, []);

  const handleCancel = async () => {
    const result = await swalWithBootstrapButtons.fire({
      title: '¿Está seguro de querer eliminar la reserva?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar reserva',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await fetchData('user/reserveDelete', 'put', { booking_id }, token);
        await swalWithBootstrapButtons.fire({
          title: '¡Eliminado!',
          text: 'Tu reserva ha sido borrada.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        onDeleted(booking_id);
      } catch (error) {
        console.error(error);
        await swalWithBootstrapButtons.fire({
          title: 'Error',
          text: 'No se pudo borrar la reserva. Intenta más tarde.',
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
      <Card className="mb-4 shadow-sm w-100">
        <Card.Body>
          <Row className="align-items-center d-flex justify-content-between">
            <Col xs={12} md={6}>
              <h5 className="fw-bold mb-2">
                Identificador de reserva: {booking_id}
              </h5>
            </Col>
            <Col
              xs={12}
              md={6}
              className="text-md-end text-center mt-2 mt-md-0 d-flex justify-content-md-end justify-content-center gap-2"
            >
              <button type="button" className="botones" onClick={handleCancel}>
                Cancelar Reserva
              </button>
              <button
                type="button"
                className="botones"
                onClick={() => navigate(`/user/editReserve/${booking_id}`)}
              >
                Editar Reserva
              </button>
            </Col>
          </Row>

          <hr className="my-3" />
          <Row className="text-muted">
            <Col
              xs={12}
              md={4}
              className="mb-2 d-flex justify-content-center align-items-center"
            >
              <div>
                <strong>Fecha de entrada: </strong>
                {startDate}
              </div>
            </Col>
            <Col
              xs={12}
              md={4}
              className="mb-2 d-flex justify-content-center align-items-center"
            >
              <div>
                <strong>Fecha de salida: </strong>
                {endDate}
              </div>
            </Col>
            <Col xs={12} md={4} className="mb-2">
              <div>
                <strong>Servicios</strong>
                <div className="d-flex flex-wrap gap-2 mt-1">
                  {reserveService.map((service, index) => (
                    <Badge bg="secondary" key={index} className="text-wrap">
                      {service.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
