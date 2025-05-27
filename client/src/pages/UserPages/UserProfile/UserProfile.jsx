import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';
import './userProfile.css';
import { fetchData } from '../../../helpers/axiosHelper';

const UserProfile = () => {
  const { user, setUser, token } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  console.log('userrrr', user)

  useEffect(()=>{
    const getUser = async () => {
          try {
            const result = await fetchData('user/userById', 'get', null, token);
            console.log(result);
            setUser(result.data.userLogged);
          } catch (err) {
            console.log(err);
            setMessage('Error al cargar los datos del usuario');
            throw err;
          }
        };
        getUser();
  },[])

  const deleteProfile = async () => {
    try {
      await fetchData(`user/delUser/${user.user_id}`, 'put', null, token);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="section-perfil d-flex justify-content-center position-relative">
        <Container className="profile-container1 p-4 rounded position-relative">
          <Row className='justify-content-center'>
            <Col xs="auto" className='text center'>
              <div className='img-wrapper'>
                <img src="/images/logo.png" alt="fotoPerfil"
                className='profile-img'/>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6} className='col-profile'>
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Apellidos:</strong> {user.lastname}</p>
              <p><strong>Dirección:</strong> {user.address}</p>
              <p><strong>Telefono de contacto:</strong> {user.phone}</p>
              <p><strong>Matrícula del coche:</strong> {user.car_registration}</p>
            </Col>
            <Col md={6} className='col-profile'>
              <p><strong>País:</strong> {user.country}</p>
              <p><strong>Tipo de documento:</strong> {user.document_type}</p>
              <p><strong>Número de documento:</strong> {user.document_number}</p>
              <p><strong>Fecha de nacimiento:</strong> {user.birth_date}</p>
              <p><strong>Modelo del coche:</strong> {user.car_brand}</p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs="auto" className="d-flex gap-3 ">
              <button
                className="botones-perfil"
                onClick={() => navigate('/user/editUserById/:user_id')}
              >
                Editar
              </button>
              <button onClick={deleteProfile} className="botones-perfil">
                Eliminar
              </button>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col className="text-center">
              <h2>Mis reservas</h2>
            </Col>
          </Row>
        </Container>
        <p>{message}</p>
      </section>
    </>
  );
};

export default UserProfile;
