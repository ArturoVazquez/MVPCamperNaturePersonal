import React from 'react';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchData } from '../../../../helpers/axiosHelper';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { useState } from 'react';
import './reserve2.css';

export const Reserve_2 = ({
  setShowReserve,
  setReservaData,
  reservaData,
  cancel,
}) => {
  const { token } = useContext(AuthContext);
  const [getServices, setGetServices] = useState([]);
  const [serviceIncluded, setServiceIncluded] = useState([]);
  const [serviceNoIncluded, setServiceNoIncluded] = useState([]);
  const [extra, setExtra] = useState({});

  useEffect(() => {
    const getService = async () => {
      let result = await fetchData('user/getService', 'get', null, token);
      const services = result.data.getService;
      setGetServices(services);
      setServiceIncluded(
        services.filter(
          (elem) =>
            elem.is_included === 0 &&
            !['Temporada Alta', 'Temporada Baja'].includes(elem.name)
        )
      );

      setServiceNoIncluded(
        services.filter(
          (elem) =>
            elem.is_included === 1 &&
            !['Vaciado sin estancia'].includes(elem.name)
        )
      );
    };
    getService();
  }, []);

  useEffect(() => {
    if (serviceNoIncluded.length > 0) {
      const initialQuantity = {};
      serviceNoIncluded.forEach((e) => {
        const previo = reservaData.serviceNoIncluded?.find(
          (s) => s.service_id === e.service_id
        );
        initialQuantity[e.service_id] = previo ? previo.amount : 0;
      });
      setExtra(initialQuantity);
    }
  }, [serviceNoIncluded]);

  const updateQuantity = (id, value, max) => {
    setExtra((prev) => {
      const newQuantity = {
        ...prev,
        [id]: Math.min(Math.max((prev[id] || 0) + value, 0), max),
      };
      return newQuantity;
    });
  };

  const handleNext = () => {
    const extraSelected = Object.entries(extra)
      .filter(([, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const servicio = serviceNoIncluded.find(
          (s) => s.service_id === Number(id)
        );
        return {
          service_id: Number(id),
          amount: quantity,
          name: servicio?.name || '',
          price: servicio?.price || 0,
        };
      });
    setReservaData({ ...reservaData, serviceNoIncluded: extraSelected });
    setShowReserve(3);
  };

  return (
    <section>
      <Container>
        <p className="mt-5 paso2">Paso 2 de 4</p>
        <h2 className="text-center fw-semibold title-service mt-4">Servicios</h2>
        <Row className='flex-column flex-md-row'>
          <Col>
            <article className="mt-4">
              <p className="title-p mb-4">
                <strong>Servicios Incluidos</strong>
              </p>
              <ul className='paso2'>
                {serviceIncluded.map((elem) => {
                  return <li className='mt-2' key={elem.service_id}>{elem.name}</li>;
                })}
              </ul>
            </article>
          </Col>
          <Col>
            <article className="mt-4">
              <p className="title-p mb-4">
                <strong>Añadir servicios adicionales</strong>
              </p>
              {serviceNoIncluded.map((elem) => {
                return (
                  <div
                    key={elem.service_id}
                    className="d-flex justify-content-between align-items-center my-2 paso2"
                  >
                    <p className="mb-0">{elem.name}</p>
                    <div className="d-flex align-items-center gap-2">
                      <span
                        type="button"
                        className="icon-btn"
                        onClick={() =>
                          updateQuantity(elem.service_id, -1, elem.max_total)
                        }
                      >
                        <i className="bi bi-patch-minus"></i>
                      </span>
                      <span className="quantity-value">
                        {extra[elem.service_id] || 0}
                      </span>
                      <span
                        type="button"
                        className="icon-btn"
                        onClick={() =>
                          updateQuantity(elem.service_id, 1, elem.max_total)
                        }
                      >
                        <i className="bi bi-patch-plus"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </article>
          </Col>
          <div className="d-flex justify-content-around pt-5">
            <button
              type="button"
              className="botones-edit"
              onClick={() => setShowReserve(1)}
            >
              Anterior
            </button>
            <button type="button" className="botones-edit" onClick={cancel}>
              Cancelar
            </button>
            <button type="button" className="botones-edit" onClick={handleNext}>
              Siguiente
            </button>
          </div>
        </Row>
      </Container>
    </section>
  );
};
