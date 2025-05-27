import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import './editService.css';

const initialValue = {
  name: '',
  price: '',
  description: '',
  max_total: '',
};

const EditService = () => {
  const { id: service_id } = useParams();
  const [editService, setEditService] = useState(initialValue);
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
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
        setEditService(res.data);
      } catch (error) {
        setErrorMsg('No se pudo editar el servicio');
      }
    };
    if (service_id) fetchService();
  }, [service_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditService({ ...editService, [name]: value });
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    try {
      const newFormData = new FormData();
      newFormData.append('service_data', JSON.stringify(editService));
      newFormData.append('file', file);

      await fetchData(
        `admin/editService/${service_id}`,
        'PUT',
        newFormData,
        token
      );

      setMessage('Servicio editado correctamente');
      navigate(-1);
    } catch (error) {
      setErrorMsg('Error al editar el servicio');
    }
  };

  return (
    <div className="section-edit container">
      <h1>Editar Servicio</h1>
      <div className="caja-edit">
        {message && <Alert variant="info">{message}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Form className="mt-3">
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Servicio</Form.Label>
                <Form.Control
                  name="name"
                  value={editService.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  name="price"
                  value={editService.price}
                  onChange={handleChange}
                />
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
                  onChange={handleChangeFile}
                  style={{ display: 'none' }}
                />

                {file && (
                  <small className="text-muted mt-1 d-block">
                    Archivo: {file.name}
                  </small>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio Máximo</Form.Label>
                <Form.Control
                  type="number"
                  name="max_total"
                  value={editService.max_total}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} className="descript-button">
              <Form.Group className="mb-3 w-100">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={7}
                  value={editService.description}
                  onChange={handleChange}
                  className="form-description"
                />
              </Form.Group>

              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center w-100">
                <Button onClick={() => navigate(-1)}>Cancelar</Button>
                <Button onClick={onSubmit}>Guardar</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default EditService;
