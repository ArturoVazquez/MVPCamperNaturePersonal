import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ZodError } from 'zod';
import { fetchData } from '../../../../helpers/axiosHelper';
import { editUserSchema } from '../../../../schemas/editUserSchema';
import '../../EditUser/editUser.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReactFlagsSelect from "react-flags-select";
import countries from "i18n-iso-countries";
import es from "i18n-iso-countries/langs/es.json";

countries.registerLocale(es); 

const getCountryName = (code) => {
  return countries.getName(code, "es"); 
};

const getCountryCode = (name) => {
  const countryObj = countries.getNames("es");
  const code = Object.keys(countryObj).find(
    (key) => countryObj[key].toLowerCase() === name.toLowerCase()
  );
  return code || ""; 
};

const Reserve_3 = ({
  message,
  setMessage,
  setShowReserve,
  cancel,
  userDetails,
  setUserDetails,
  reservaData,
  setReservaData,
}) => {
  const token = localStorage.getItem('token');
  const [valError, setValError] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await fetchData('user/userById', 'get', null, token);
        const user = result.data.userLogged;

        const code = getCountryCode(user.country);
        setUserDetails({
          ...user,
          countryCode: code
        });
      } catch (err) {
        setMessage('Error al cargar los datos del usuario');
        throw err;
      }
    };
    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'preferences') {
      setReservaData({ ...reservaData, [name]: value });
    } else {
      setUserDetails({ ...userDetails, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setMessage('');
    setValError({});
    try {
      if (
        !userDetails.name ||
        !userDetails.lastname ||
        !userDetails.phone ||
        !userDetails.address ||
        !userDetails.prefix ||
        !userDetails.birth_date ||
        !userDetails.email ||
        !userDetails.country ||
        !userDetails.document_type ||
        !userDetails.document_number ||
        !userDetails.car_registration ||
        !userDetails.car_brand
      ) {
        setMessage(
          'Por favor completa todos los campos, para poder realizar la reserva'
        );
      } else {
        editUserSchema.parse(userDetails);
        const result = await fetchData(
          'user/editUser',
          'put',
          userDetails,
          token
        );
        setMessage(result.data.message);
        setShowReserve(4);
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
         <p>Paso 3 de 4</p>
        <h2 className="fw-semibold text-center pb-4 color-info">
          Información de Contacto
        </h2>
        {message && <div className="alert alert-info">{message}</div>}
        <Row className="py-4">
          <Col>
            <form className="row g-3 edit">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userDetails?.name || ''}
                  onChange={handleChange}
                />
                {valError.name && <p>{valError.name}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={userDetails?.lastname || ''}
                  onChange={handleChange}
                />
                {valError.lastname && <p>{valError.lastname}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={userDetails?.address || ''}
                  onChange={handleChange}
                />
                {valError.address && <p>{valError.address}</p>}
              </div>
              <div className="col-md-3">
                <label className="form-label">Prefijo</label>
                <PhoneInput
                  country={'es'}
                  value={userDetails?.prefix || ''}
                  onChange={(phone) =>
                    setUserDetails({ ...userDetails, prefix: phone })
                  }
                />
                {valError.prefix && <p>{valError.prefix}</p>}
              </div>
              <div className="col-md-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={userDetails?.phone || ''}
                  onChange={handleChange}
                />
                {valError.phone && <p>{valError.phone}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Fecha de nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  name="birth_date"
                  value={userDetails?.birth_date || ''}
                  onChange={handleChange}
                />
                {valError.birth_date && <p>{valError.birth_date}</p>}
              </div>
                  <div className="col-md-6">
                <label className="form-label">País</label>
                <ReactFlagsSelect
                    selected={userDetails?.countryCode || ""}
                    onSelect={(code) =>
                      setUserDetails({
                        ...userDetails,
                        country: getCountryName(code),
                        countryCode: code,
                      })
                    }
                    searchable  
                    placeholder="Selecciona tu país"
                     searchPlaceholder="Buscar países"
                  className="form-control p-0"              
                  />
                 {valError.country && <p>{valError.country}</p>}
                 </div>
              <div className="col-md-6">
                <label className="form-label">
                  Selecciona el tipo de documento
                </label>
                <select
                  className="form-control"
                  name="document_type"
                  value={userDetails?.document_type || ''}
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
                  {valError.document_type && <p>{valError.document_type}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Número de documento</label>
                <input
                  type="text"
                  className="form-control"
                  name="document_number"
                  value={userDetails?.document_number || ''}
                  onChange={handleChange}
                />
                {valError.document_number && <p>{valError.document_number}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Matrícula de Coche</label>
                <input
                  type="text"
                  className="form-control"
                  name="car_registration"
                  value={userDetails?.car_registration || ''}
                  onChange={handleChange}
                />
                {valError.car_registration && (
                  <p>{valError.car_registration}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Selecciona el tipo de vehículo
                </label>
                <select
                  className="form-control"
                  name="car_brand"
                  value={userDetails?.car_brand || ''}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Furgoneta camper (hasta 5,4 m)">
                    Furgoneta camper (hasta 5,4 m) - Ej: VW California, Peugeot
                    Rifter
                  </option>
                  <option value="Camper mediana / Autocaravana compacta (5,5 m - 6,4 m)">
                    Camper mediana / Autocaravana compacta (5,5 m - 6,4 m)
                  </option>
                  <option value="Autocaravana estándar (6,5 m - 7,4 m)">
                    Autocaravana estándar (6,5 m - 7,4 m)
                  </option>
                  <option value="Autocaravana grande (7,5 m - 8,5 m máx.)">
                    Autocaravana grande (7,5 m - 8,5 m máx.)
                  </option>
                  <option value="vehiculo remolque">
                    Vehículo con remolque o accesorios adicionales - Requiere
                    contacto
                  </option>
                </select>
                {valError.car_brand && <p>{valError.car_brand}</p>}
              </div>
              <div className="col-md-12">
                <label className="form-label">Preferencias</label>
                <textarea
                  className="form-control"
                  name="preferences"
                  value={reservaData?.preferences || ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Máximo 250 caracteres"
                />
              </div>
              <div className="col-12 pt-4"></div>
            </form>
            <div className="d-flex justify-content-around pt-5">
              <button
                type="button"
                className="botones-edit"
                onClick={() => setShowReserve(2)}
              >
                Anterior
              </button>
              <button type="button" onClick={cancel} className="botones-edit">
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="botones-edit"
              >
                Siguiente
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Reserve_3;
