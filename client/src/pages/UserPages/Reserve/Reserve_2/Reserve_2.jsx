import React from 'react'
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchData } from '../../../../helpers/axiosHelper';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { useState } from 'react';

export const Reserve_2 = () => {
  const {token} = useContext(AuthContext);
  const [getServices, setGetServices] = useState([]);
  const [serviceIncluded, setServiceIncluded] = useState([]);
  const [serviceNoIncluded, setServiceNoIncluded] = useState([]);
  console.log('serviceNoIncluded', serviceNoIncluded)
  
 
  useEffect(()=>{
    const getService = async () =>{
      let result = await fetchData ('user/getService', 'get', null, token);
      const services = result.data.getService;
      setGetServices(services);
      setServiceIncluded(
        services.filter(elem => elem.is_included === 0 && !["Temporada Alta", "Temporada Baja"].includes(elem.name))
      );

      setServiceNoIncluded(
        services.filter(elem => elem.is_included === 1)
      );

    }
    getService();
  },[])
  return (
    <section>
      <Container>
        <p>Paso 2 de 4</p>
        <h2 className='text-center fw-semibold'>Servicios</h2>
      <Row>
        <Col>
        <article>
          <p>Servicios Incluidos</p>
          <ul>
           {serviceIncluded.map((elem)=>{
            return(
              <li key={elem.service_id}>{elem.name}</li>
            );
           })}
          </ul>

        </article>
        </Col>
        <Col>
        <p>Añadir servicios adicionales</p>
        {serviceNoIncluded.map((elem)=>{
          return(
            <div key={elem.service_id}>
              <p>{elem.name}</p>
              <button type='button'></button>
              <span>{}</span>
              <button type='button'></button>
            </div>
          )
        })
        }

        
        </Col>
        <div className="d-flex justify-content-around pt-5">
          <button type="button"  className="botones-edit">
              Anterior
            </button>
             <button type="button"  className="botones-edit">
              Cancelar
            </button>
            <button type="button"  className="botones-edit">
              Siguiente
            </button>
          </div>
      </Row>
      </Container>
    </section>
  )
}
