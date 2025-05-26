import React from 'react'
import { Button, Card } from 'react-bootstrap'
import './card.css'
import { fetchData } from '../../helpers/axiosHelper'

export const CardService = ({service, setServices, services}) => {

  const deleteService = async(service) =>{
    try {
      await fetchData(`admin/delService/${service.service_id}`, "delete");
      setServices(services.filter(e => e.service_id !== service.service_id))
    } catch (error) {
      console.log(error);
      
    }
  }


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
        <div className='d-flex gap-3'>
          <button className='botones-perfil'>Modificar</button>
          <button onClick={()=>deleteService(service)} className='botones-perfil'>Eliminar</button>
        </div>
      </Card.Body>
    </Card>
  )
}
