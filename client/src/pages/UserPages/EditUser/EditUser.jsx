import React, { useState, useEffect} from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { ZodError } from 'zod';
import { editUserSchema } from '../../../schemas/editUserSchema';
import './editUser.css';



const EditUser = () => {
  const [editUser, setEditUser] = useState();
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const [valError, setValError] = useState({});
  console.log('error del zod en useredit', valError)


  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await fetchData('user/userById', 'get', null, token);
        console.log(result);
        setEditUser(result.data.userLogged);
      } catch (err) {
        console.log(err);
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
    setMessage("");
    setValError({});
    try {
      if (!editUser.name || !editUser.lastname || !editUser.phone) {
        setMessage(
          'Por favor completa los campos obligatorios: Nombre, Apellido y Teléfono'
        );
      } else {
        editUserSchema.parse(editUser)
        const result = await fetchData('user/editUser', 'put', editUser, token);
        console.log(result);
        setMessage(result.data.message);
      }
    } catch (err) {
      console.log("error en edituser", err);
      if(err instanceof ZodError){
        let objTemp = {};
        err.errors.forEach((er)=>{
          objTemp[er.path[0]] = er.message
        })
        setValError(objTemp)
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Usuario</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={editUser?.name}
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
            value={editUser?.lastname}
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
            value={editUser?.address}
            onChange={handleChange}
          />
          {valError.address && <p>{valError.address}</p>}
        </div>

        <div className="col-md-3">
          <label className="form-label">Prefijo</label>
          <input
            type="text"
            className="form-control"
            name="prefix"
            value={editUser?.prefix}
            onChange={handleChange}
          />
          {valError.prefix && <p>{valError.prefix}</p>}
        </div>

        <div className="col-md-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={editUser?.phone}
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
            value={editUser?.birth_date}
            onChange={handleChange}
          />
          {valError.birth_date && <p>{valError.birth_date}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">País</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={editUser?.country}
            onChange={handleChange}
          />
          {valError.country && <p>{valError.country}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Tipo de documento</label>
          <input
            type="text"
            className="form-control"
            name="document_type"
            value={editUser?.document_type}
            onChange={handleChange}
          />
          {valError.document_type && <p>{valError.document_type}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Número de documento</label>
          <input
            type="text"
            className="form-control"
            name="document_number"
            value={editUser?.document_number}
            onChange={handleChange}
          />
          {valError.document_number && <p>{valError.document_number}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Coche</label>
          <input
            type="text"
            className="form-control"
            name="car"
            value={editUser?.car}
            onChange={handleChange}
          />
          {valError.car && <p>{valError.car}</p>}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
