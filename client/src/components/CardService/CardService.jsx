import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './card.css';
import { fetchData } from '../../helpers/axiosHelper';
import { useNavigate } from 'react-router-dom';

export const CardService = ({ service, setServices, services }) => {
  const navigate = useNavigate();
  const deleteService = async (service) => {
    try {
      await fetchData(`admin/delService/${service.service_id}`, 'delete');
      setServices(services.filter((e) => e.service_id !== service.service_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="services">
      <Card.Img
        variant="top"
        src={`${import.meta.env.VITE_SERVER_URL}images/service/${
          service.service_img
        }`}
      />
      <Card.Body>
        <Card.Title>{service.name}</Card.Title>
        <Card.Text>{service.description}</Card.Text>
        <Card.Text>{service.price}€</Card.Text>
        <Card.Text>
          <strong>¿Incluido?:</strong> {service.is_included ? 'No' : 'Si'}
        </Card.Text>
        <div style={{ marginTop: 'auto' }} className="d-flex gap-3">
          <button
            className="botones"
            onClick={() => navigate(`/admin/editService/${service.service_id}`)}
          >
            Modificar
          </button>
          <button onClick={() => deleteService(service)} className="botones">
            Eliminar
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};
