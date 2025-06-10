import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { ZodError } from 'zod';
import { editUserSchema } from '../../../schemas/editUserSchema';
import './editUser.css';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ReactFlagsSelect from "react-flags-select";
import countries from "i18n-iso-countries";
import es from "i18n-iso-countries/langs/es.json";

countries.registerLocale(es); 

const getCountryName = (code) => {
  return countries.getName(code, "es"); 
};

const EditUser = () => {
  const [editUser, setEditUser] = useState();
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const [valError, setValError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await fetchData('user/userById', 'get', null, token);
      setEditUser(result.data.userLogged);       
      } catch (err) {
        setMessage('Error al cargar los datos del usuario');
        throw err;
      }
    };
    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setValError({});
    try {
      if (!editUser.name || !editUser.lastname || !editUser.phone) {
        setMessage(
          'Por favor completa los campos obligatorios: Nombre, Apellido y Teléfono'
        );
      } else {
        editUserSchema.parse(editUser);
        const result = await fetchData('user/editUser', 'put', editUser, token);
        setMessage(result.data.message);
        navigate('/user/profile');
      }
    } catch (err) {
      if (err instanceof ZodError) {
        let objTemp = {};
        err.errors.forEach((er) => {
          objTemp[er.path[0]] = er.message;
        });
        setValError(objTemp);
      }
    }
  };

  return (
    <section className="section-editUser">
      <Container>
        <h2 className="fw-semibold text-center pb-4">Editar Usuario</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <Row className="py-4">
          <Col>
            <form onSubmit={handleSubmit} className="row g-3 edit">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editUser?.name || ''}
                  onChange={handleChange}
                />
                {valError.name && (
                  <p className="message-error">{valError.name}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={editUser?.lastname || ''}
                  onChange={handleChange}
                />
                {valError.lastname && (
                  <p className="message-error">{valError.lastname}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={editUser?.address || ''}
                  onChange={handleChange}
                />
                {valError.address && (
                  <p className="message-error">{valError.address}</p>
                )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Prefijo</label>
               <PhoneInput
                  country={'es'}
                  value={editUser?.prefix || ''}
                  onChange={(phone) =>
                    setEditUser({ ...editUser, prefix: phone })
                  }
                />
                {valError.prefix && (
                  <p className="message-error">{valError.prefix}</p>
                )}
              </div>
              <div className="col-md-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={editUser?.phone || ''}
                  onChange={handleChange}
                />
                {valError.phone && (
                  <p className="message-error">{valError.phone}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Fecha de nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  name="birth_date"
                  value={editUser?.birth_date || ''}
                  onChange={handleChange}
                />
                {valError.birth_date && (
                  <p className="message-error">{valError.birth_date}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">País</label>
                <ReactFlagsSelect
                    selected={editUser?.countryCode || ""}
                    onSelect={(code) =>
                      setEditUser({
                        ...editUser,
                        country: getCountryName(code),
                        countryCode: code,
                      })
                    }
                    searchable  
                    placeholder="Selecciona tu país"
                  className="form-control p-0"              
                  />
                {valError.country && (
                  <p className="message-error">{valError.country}</p>
                )}
              </div>
            <div className="col-md-6">
                <label className="form-label">
                  Selecciona el tipo de documento
                </label>
                <select
                  className="form-control"
                  name="document_type"
                  value={editUser?.document_type || ''}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="DNI">
                   DNI
                  </option>
                  <option value="NIE">
                    NIE 
                  </option>
                   <option value="TIE">
                   TIE  
                  </option>
                  <option value="Pasaporte">
                   Pasaporte
                  </option>
                  <option value="Permiso de residencia">
                    Permiso de residencia
                  </option>
                </select>
                  {valError.document_type && (
                  <p className="message-error">{valError.document_type}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Número de documento</label>
                <input
                  type="text"
                  className="form-control"
                  name="document_number"
                  value={editUser?.document_number || ''}
                  onChange={handleChange}
                />
                {valError.document_number && (
                  <p className="message-error">{valError.document_number}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Matrícula de Coche</label>
                <input
                  type="text"
                  className="form-control"
                  name="car_registration"
                  value={editUser?.car_registration || ''}
                  onChange={handleChange}
                />
                {valError.car_registration && (
                  <p className="message-error">{valError.car_registration}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Selecciona el tipo de vehículo
                </label>
                <select
                  className="form-control"
                  name="car_brand"
                  value={editUser?.car_brand || ''}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Furgoneta camper (hasta 5,4 m)">
                    Furgoneta camper (hasta 5,4 m) – Ej: VW California, Peugeot
                    Rifter
                  </option>
                  <option value="Camper mediana / Autocaravana compacta (5,5 m – 6,4 m)">
                    Camper mediana / Autocaravana compacta (5,5 m – 6,4 m)
                  </option>
                  <option value="Autocaravana estándar (6,5 m – 7,4 m)">
                    Autocaravana estándar (6,5 m – 7,4 m)
                  </option>
                  <option value="Autocaravana grande (7,5 m – 8,5 m máx.)">
                    Autocaravana grande (7,5 m – 8,5 m máx.)
                  </option>
                  <option value="vehiculo remolque">
                    Vehículo con remolque o accesorios adicionales – Requiere
                    contacto
                  </option>
                </select>
                {valError.car_brand && (
                  <p className="message-error">{valError.car_brand}</p>
                )}
              </div>
              <div className="col-12 pt-4 d-flex gap-3">
                <button type="submit" className="botones-edit">
                  Guardar cambios
                </button>
                <button
                  onClick={() => navigate('/user/profile')}
                  type="button"
                  className="botones-edit"
                >
                  cancelar
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditUser;
