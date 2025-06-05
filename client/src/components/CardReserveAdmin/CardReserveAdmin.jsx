import React, { useContext } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContextProvider';
import { fetchData } from '../../helpers/axiosHelper';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-success',
  },
  buttonsStyling: false,
});

export const CardReserveAdmin = ({
  usersReseve,
  setUsersReserve,
  userReseve,
}) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const cancel = async (booking_id) => {
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
        await fetchData(`admin/delReserve`, 'delete', { booking_id }, token);
        await swalWithBootstrapButtons.fire({
          title: '¡Eliminado!',
          text: 'Tu reserva ha sido borrada.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setUsersReserve(usersReseve.filter((e) => e.booking_id !== booking_id));
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
    <Card className="mb-4 shadow-sm w-100">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="d-flex gap-3">
            <h5 className="fw-bold mb-2">
              {userReseve.name} {userReseve.lastname}
            </h5>
            <p>
              (Teléfono: {userReseve.prefix} {userReseve.phone})
            </p>
          </Col>
          <Col xs={12} md={6} className="text-md-end text-center mt-2 mt-md-0">
            <button
              type="button"
              className="me-2 botones"
              size="sm"
              onClick={() =>
                navigate(`/admin/EditReserveAdmin/${userReseve.booking_id}`)
              }
            >
              Modificar
            </button>
            <button
              type="button"
              className="botones"
              size="sm"
              onClick={() => cancel(userReseve.booking_id)}
            >
              Eliminar
            </button>
          </Col>
        </Row>

        <hr className="my-3" />
        <Row className="text-muted">
          <Col xs={12} md={4} className="mb-2">
            <div>
              <strong>Check-in:</strong>
              <div className="text-break">{userReseve.start_date}</div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <div>
              <strong>Check-out:</strong>
              <div>{userReseve.end_date}</div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <div>
              <strong>Tipo de vehículo:</strong>
              <div>{userReseve.car_brand}</div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <div>
              <strong>Preferencias:</strong>
              <div>{userReseve.preferences}</div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <div>
              <strong>Servicios contratados:</strong>
              <div>{userReseve.services}</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
