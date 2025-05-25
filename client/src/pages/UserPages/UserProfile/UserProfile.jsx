import { useContext, useState } from 'react';
import {  Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';
import './userProfile.css';
import { fetchData } from '../../../helpers/axiosHelper';

const UserProfile = () => {
  const { user, setUser, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteProfile = async() =>{
 try {
   await fetchData(`user/delUser/${user.user_id}`, "put", null, token)
   setUser(null)
   navigate('/')

 } catch (error) {
  console.log(error);
  
  
 }
}
  return (
    <>
      <section className="py-4 d-flex justify-content-center">
        <Container className="profile-container p-4 rounded">
          <Row>
            <Col>
              <img src="#" alt="" />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6} className='col-profile'>
              <p>Nombre: {user.name}</p>
              <p>Apellidos: {user.lastname}</p>
              <p>Dirección: {user.address}</p>
              <p>Telefono de contacto: {user.phone}</p>
              <p>Información del vehículo: {user.car}</p>
            </Col>
            <Col md={6} className='col-profile'>
              <p>País: {user.country}</p>
              <p>Tipo de documento: {user.document_type}</p>
              <p>Número de documento: {user.document_number}</p>
              <p>Fecha de nacimiento: {user.birth_date}</p>
            </Col>
          </Row>

          <Row className='justify-content-center'>
            <Col xs="auto" className='d-flex gap-3 '>
              <button className='botones-perfil' onClick={() => navigate('/user/editUserById/:user_id')}>
                Editar
              </button>
              <button onClick={deleteProfile} className='botones-perfil'>Eliminar</button>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col className='text-center'>
              <h2>Mis reservas</h2>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UserProfile;
