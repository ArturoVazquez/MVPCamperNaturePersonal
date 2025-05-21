import React, { useState, useEffect } from 'react';
import { fetchData } from '../../helpers/axiosHelper';
import { useParams } from 'react-router-dom';



const EditUser = () => {
  const { user_id } = useParams();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
  const getUser = async () => {
    try {
      const res = await fetchData(`users/getUser/${user_id}`, 'GET', null, token); 
      setUser(res.data); 
    } catch (err) {
      setMessage('Error al cargar los datos del usuario');
    }
  };
  getUser();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.lastname || !user.phone) {
      setMessage('Por favor completa los campos obligatorios');
      return;
    }

    try {
      const res = await fetchData('/users/editUser', 'PUT', { ...user, user_id }, token);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error al actualizar el usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Usuario</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="name" /* value={user?.name} */ onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Apellido</label>
          <input type="text" className="form-control" name="lastname" /* value={user?.lastname} */ onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control" name="address" /* value={user?.address} */ onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Prefijo</label>
          <input type="text" className="form-control" name="prefix" /* value={user?.prefix} */ onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-control" name="phone" /* value={user?.phone} */ onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Fecha de nacimiento</label>
          <input type="date" className="form-control" name="birth_date" /* value={user?.birth_date?.slice(0, 10)} */ onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">País</label>
          <input type="text" className="form-control" name="country" /* value={user?.country} */ onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Tipo de documento</label>
          <input type="text" className="form-control" name="document_type" /* value={user?.document_type} */ onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Número de documento</label>
          <input type="text" className="form-control" name="document_number" /* value={user?.document_number} */ onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Coche</label>
          <input type="text" className="form-control" name="car" /* value={user?.car} */ onChange={handleChange} />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar cambios</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
