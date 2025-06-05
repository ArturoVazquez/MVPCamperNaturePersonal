import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import { editServiceSchema } from '../../../schemas/editServiceSchema';
import { z } from 'zod';
import './editService.css';

const initialValue = {
  name: '',
  price: '',
  description: '',
  max_total: '',
  is_included: true,
};

const EditService = () => {
  const { id: service_id } = useParams();
  const [editService, setEditService] = useState(initialValue);
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [file, setFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetchData(
          `admin/editService/${service_id}`,
          'GET',
          null,
          token
        );
        setEditService({
          ...res.data,
          is_included: res.data.is_included === 0 ? false : true,
        });
      } catch (error) {
        console.log(error);
        setErrorMsg('No se pudo editar el servicio');
      }
    };
    if (service_id) fetchService();
  }, [service_id, token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'service_img') {
      setEditService({ ...editService, service_img: e.target.files[0] });
    } else if (name === 'is_included') {
      let valor = false;
      if (value === 'true') {
        valor = true;
      }

      setEditService({ ...editService, is_included: valor });
    } else {
      setEditService({ ...editService, [name]: value });
    }
  };

  const onSubmit = async () => {
    try {
      const parsedData = {
        ...editService,
        price: Number(editService.price),
        max_total: Number(editService.max_total),
      };

      editServiceSchema.parse(parsedData);
      setFormErrors({});

      const newFormData = new FormData();
      newFormData.append('service_data', JSON.stringify(parsedData));
      newFormData.append('file', editService.service_img);

      await fetchData(
        `admin/editService/${service_id}`,
        'PUT',
        newFormData,
        token
      );

      setMessage('Servicio editado correctamente');
      navigate(-1);
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        const errors = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setFormErrors(errors);
      } else {
        setErrorMsg('Error al editar el servicio');
      }
    }
  };

  return (
    <div className="section-edit container">
      <h1>Editar Servicio</h1>
      <div className="caja-edit">
        {message && <Alert variant="info">{message}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <Form className="mt-3 rounded">
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Servicio:</Form.Label>
                <Form.Control
                  name="name"
                  value={editService.name}
                  onChange={handleChange}
                  isInvalid={!!formErrors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio:</Form.Label>
                <Form.Control
                  name="price"
                  value={editService.price}
                  onChange={handleChange}
                  isInvalid={!!formErrors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.price}
                </Form.Control.Feedback>
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
                {file && (
                  <small className="text-muted mt-1 d-block">
                    Archivo: {file.name}
                  </small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formIsIncluded">
                <Form.Label>¿Está incluido?</Form.Label>
                <Form.Select
                  name="is_included"
                  value={editService.is_included ? 'true' : 'false'}
                  onChange={handleChange}
                >
                  <option value="false" selected={!editService.is_included}>
                    No
                  </option>
                  <option value="true" selected={editService.is_included}>
                    Sí
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio total:</Form.Label>
                <Form.Control
                  type="number"
                  name="max_total"
                  value={editService.max_total}
                  onChange={handleChange}
                  min="0"
                  isInvalid={!!formErrors.max_total}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.max_total}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="descript-button">
              <Form.Group className="mb-3 w-100">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={7}
                  value={editService.description}
                  onChange={handleChange}
                  className="form-description"
                  isInvalid={!!formErrors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center w-100">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="botones"
                >
                  Cancelar
                </button>
                <button type="button" onClick={onSubmit} className="botones">
                  Guardar
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default EditService;
