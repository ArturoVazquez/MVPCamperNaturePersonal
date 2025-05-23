import React from 'react'
import { Button, Card } from 'react-bootstrap'
import './card.css'

export const CardService = ({service}) => {
  return (
     <Card className='services' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${import.meta.env.VITE_SERVER_URL}images/service/${service.service_img}`} />
      <Card.Body>
        <Card.Title>{service.name}</Card.Title>
        <Card.Text>
            {service.description}
        </Card.Text>
        <Card.Text>
            {service.price}€
        </Card.Text>
        <Button variant="primary">Modificar</Button>
        <Button variant="primary">Eliminar</Button>
      </Card.Body>
    </Card>
  )
}
