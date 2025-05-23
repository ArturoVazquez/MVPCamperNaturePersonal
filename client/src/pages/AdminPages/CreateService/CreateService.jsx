import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import {  serviceFormSchema } from '../../../schemas/ServicesSchema';
import { ZodError } from 'zod';
import { CardService } from '../../../components/CardService/CardService';

const initialValue = {
  name: '',
  price: '',
  description: '',
  max_total: '',
  
};

const CreateService = () => {
  const [serviceForm, setServiceForm] = useState(initialValue);
  const [successMsg, setSuccessMsg] = useState(false);
  const [valError, setValError] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const [services, setServices] = useState([]);

  useEffect(()=>{
    const fetch = async () => {
      try {
        let res = await fetchData('admin/allServices', 'get')
        setServices(res.data)
        console.log(res);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetch()
  }, [])
   

  const handleChange = (e) => {

    const { name, value } = e.target;
    if (name === "service_img"){
      setServiceForm({ ...serviceForm, service_img: e.target.files[0] });
      
    }else{
      setServiceForm({ ...serviceForm, [name]: value });
    }
  };



  const onSubmit = async () => {
    try {
      serviceFormSchema.parse(serviceForm);
      const newFormData = new FormData();
      newFormData.append('serviceData', JSON.stringify(serviceForm));
      newFormData.append('file', serviceForm.service_img);
      await fetchData('admin/createService', 'post', newFormData);

      setSuccessMsg(true);
      setServiceForm(initialValue);
    } catch (error) {
      console.log("eeeee",error);
      
      if (error instanceof ZodError) {
        let objTemp = {};
        error.errors.forEach((er) => {
          const key = er.path[0] || 'img';
          objTemp[key] = er.message;
        });
        setValError(objTemp);
      }
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('ups, ha habido un error');
      }
    }
  };

  return (
    <>
    <Container className='py-4'>
      <Row className='justify-content-center mb-5'>
        <Col xs={12} md={8} lg={6}>
          <Form className="p-4 rounded bg-light shadow">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="text-brown">Título</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={serviceForm.name}
              />
            </Form.Group>
            {valError.name && <p>{valError.name}</p>}
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label className="text-brown">Precio:</Form.Label>
              <Form.Control
                type="text"
                name="price"
                onChange={handleChange}
                value={serviceForm.price}
              />
            </Form.Group>
            {valError.price && <p>{valError.price}</p>}
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label className="text-brown">Imagen:</Form.Label>
              <Form.Control
                type="file"
                name="service_img"
                onChange={handleChange}
              />
            </Form.Group>
            {valError.service_img && <p>{valError.service_img}</p>}
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label className="text-brown">Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="description"
                onChange={handleChange}
                value={serviceForm.description}
              />
            </Form.Group>
            {valError.description && <p>{valError.description}</p>}
            <Form.Group className="mb-3" controlId="formBasicTotal">
              <Form.Label className="text-brown">Total:</Form.Label>
              <Form.Control
                type="text"
                name="max_total"
                onChange={handleChange}
                value={serviceForm.max_total}
              />
            </Form.Group>
            {valError.max_total && <p>{valError.max_total}</p>}
            <Button onClick={onSubmit} variant="primary" className="form-button">
              Añadir 
            </Button>
            {successMsg && (
              <p className="text-success text-center mt-3">Servicio añadido correctamente </p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
    <section>
      {services.map((e)=>{
        return(
          <CardService key={e.service_id} service={e}/>
        )
      })

      }
    </section>
    </>
    
  );
};

export default CreateService;
