
import { Button, Col, Container, Row } from 'react-bootstrap';



const UserProfile = () => {
  

  return (
    <>
      <section className=''>
        <Container>
      <Row>
        <Col>
        <img src="#" alt="" />
        </Col>
      </Row>
      <Row>

        <Col>
          <h1>Perfil de Usuario</h1>
            {/* <div>
           <p>Nombre:{user.name}</p>
            <p>Apellidos {user.lastname}</p>
            <p>Dirección {user.address}</p>
            <p>Telefono de contacto {user.phone}</p>
            <p>Información del vehículo {user.car}</p>
            <p>País {user.country}</p>
            <p>Tipo de documento {user.document_type}</p>
            <p>Número de documento {user.document_number}</p>
            <p>Fecha de nacimiento {user.birth_date}</p>
          </div> */}
        </Col>

        <div>
          <Button>Editar</Button>
          <Button>Eliminar</Button>
        </div>
      </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col>
              <h2>Mis reservas</h2>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UserProfile;
