import React, { useContext } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContextProvider';
import { fetchData } from '../../helpers/axiosHelper';



export const CardReserve = ({usersReseve, setUsersReserve, userReseve}) => {
  const {token} = useContext(AuthContext);
 
  const cancel = async (booking_id) => {
      console.log(booking_id);
      const confirm = window.confirm(
        '¿Estas seguro que quieres cancelar esta reserva?'
      );
      if (!confirm) return;
  
      try {
        await fetchData(`admin/delReserve`, 'delete', { booking_id }, token);
        setUsersReserve(usersReseve.filter((e)=> e.booking_id !== booking_id));
      } catch (error) {
        console.error('error del cancelreservaadmin', error);
        throw error;
      }
    };

  return(
     <Card className="mb-4 shadow-sm w-100">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <h5 className="fw-bold mb-2">
              {userReseve.name} {userReseve.lastname}
            </h5>
            <p>{userReseve.prefix} {userReseve.phone}</p>
          </Col>
          <Col xs={12} md={6} className="text-md-end text-center mt-2 mt-md-0">
            <Button
                variant="outline-success"
                size="sm"
                
              >
                Detalles
              </Button>
              <Button
                variant="outline-success"
                size="sm"
                
              >
                Modificar
              </Button>
                <Button
                variant="outline-danger"
                size="sm"
                onClick={()=>cancel(userReseve.booking_id)}
              >
                Cancelar
              </Button>
            
          </Col>
        </Row>

        <hr className="my-3" />
        <Row className="text-muted">
          <Col xs={12} md={4} className="mb-2">
            <div>
              <strong>check-in:</strong>
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
              <div>
                {userReseve.preferences} 
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
 
  
};
