import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { serviceFormSchema } from '../../../schemas/ServicesSchema';
import { ZodError } from 'zod';
import { CardService } from '../../../components/CardService/CardService';
import './createService.css';

const initialValue = {
  name: '',
  price: '',
  description: '',
  max_total: '',
  is_included: true,
  service_img: null,
};

const CreateService = () => {
  const [serviceForm, setServiceForm] = useState(initialValue);
  const [successMsg, setSuccessMsg] = useState(false);
  const [valError, setValError] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await fetchData('admin/allServices', 'get');
        setServices(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'service_img') {
      setServiceForm({ ...serviceForm, service_img: files[0] });
    } else if (name === 'is_included') {
      setServiceForm({ ...serviceForm, is_included: value === 'true' });
    } else {
      setServiceForm({ ...serviceForm, [name]: value });
    }
  };

  const onSubmit = async () => {
    try {
      serviceFormSchema.parse(serviceForm);

      if (!serviceForm.service_img) {
        setErrorMsg('Por favor, selecciona una imagen.');
        return;
      }

      const newFormData = new FormData();
      newFormData.append('serviceData', JSON.stringify(serviceForm));
      newFormData.append('file', serviceForm.service_img);

      await fetchData('admin/createService', 'post', newFormData);

      setSuccessMsg(true);
      setValError({});
      setErrorMsg('');
      setServiceForm(initialValue);
    } catch (error) {
      console.log('eeeee', error);

      if (error instanceof ZodError) {
        let objTemp = {};
        error.errors.forEach((er) => {
          const key = er.path[0] || 'img';
          objTemp[key] = er.message;
        });
        setValError(objTemp);
      } else if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Ups, ha habido un error');
      }
    }
  };

  return (
    <Container className="fomrulario-servicio-container py-4">
      <Row className="justify-content-center mb-3">
        <Col className="text-center titulo-formulario">
          <h2>LISTA DE SERVICIOS</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Form className="formulario-servicio p-4 rounded">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label className="text-brown">Título:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={serviceForm.name}
                  />
                  {valError.name && (
                    <p className="text-danger">{valError.name}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Label className="text-brown">Precio:</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    onChange={handleChange}
                    value={serviceForm.price}
                  />
                  {valError.price && (
                    <p className="text-danger">{valError.price}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicIncluded">
                  <Form.Label className="text-brown">
                    ¿Está incluido?
                  </Form.Label>
                  <Form.Select
                    name="is_included"
                    value={serviceForm.is_included.toString()}
                    onChange={handleChange}
                  >
                    <option value="false">Sí</option>
                    <option value="true">No</option>
                  </Form.Select>

                  {valError.is_included && (
                    <p className="text-danger">{valError.is_included}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage">
                  <div className="d-flex align-items-center gap-4">
                    <Form.Label className="text-brown m-0">
                      Subir imagen:
                    </Form.Label>
                    <label htmlFor="file-upload" className="m-0">
                      <i
                        className="bi bi-upload fs-3 text-secondary"
                        style={{ cursor: 'pointer' }}
                      ></i>
                    </label>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    name="service_img"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  {valError.service_img && (
                    <p className="text-danger">{valError.service_img}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                  <Form.Label className="text-brown">Descripción:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="description"
                    onChange={handleChange}
                    value={serviceForm.description}
                  />
                  {valError.description && (
                    <p className="text-danger">{valError.description}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTotal">
                  <Form.Label className="text-brown">Total:</Form.Label>
                  <Form.Control
                    type="text"
                    name="max_total"
                    onChange={handleChange}
                    value={serviceForm.max_total}
                  />
                  {valError.max_total && (
                    <p className="text-danger">{valError.max_total}</p>
                  )}
                </Form.Group>

                <div className="text-end">
                  <button onClick={onSubmit} className="botones" type="button">
                    Añadir
                  </button>
                </div>
              </Col>
            </Row>

            {successMsg && (
              <p className="text-success text-center mt-3">
                Servicio añadido correctamente
              </p>
            )}
            {errorMsg && (
              <p className="text-danger text-center mt-3">{errorMsg}</p>
            )}
          </Form>
        </Col>
      </Row>

      <section className="mt-5">
        {services.map((e) => (
          <CardService
            key={e.service_id}
            service={e}
            setServices={setServices}
            services={services}
          />
        ))}
      </section>
    </Container>
  );
};

export default CreateService;
