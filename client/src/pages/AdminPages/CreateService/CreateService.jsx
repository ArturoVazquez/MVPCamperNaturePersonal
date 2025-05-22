import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { fileSchema, serviceFormSchema } from '../../../schemas/ServicesSchema';
import { ZodError } from 'zod';

const initialValue = {
  name: '',
  price: '',
  description: '',
  max_total: '',
};

const CreateService = () => {
  const [serviceForm, setServiceForm] = useState(initialValue);
  const [file, setFile] = useState();
  const [successMsg, setSuccessMsg] = useState(false);
  const [valError, setValError] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceForm({ ...serviceForm, [name]: value });
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    try {
      serviceFormSchema.parse(serviceForm);
      fileSchema.parse(file);
      const newFormData = new FormData();
      newFormData.append('serviceData', JSON.stringify(serviceForm));
      newFormData.append('file', file);
      await fetchData('admin/createService', 'post', newFormData);

      setSuccessMsg(true);
      setServiceForm(initialValue);
    } catch (error) {
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
    <div>
      <Form className="text-center fw-bold ">
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
            onChange={handleChangeFile}
          />
        </Form.Group>
        {valError.img && <p>{valError.img}</p>}
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
          Enviar
        </Button>
        {successMsg && (
          <p className="text-success">Servicio añadido correctamente </p>
        )}
      </Form>
    </div>
  );
};

export default CreateService;
