import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { CardReserve } from '../../../components/CardReserve/CardReserve';
import { fetchData } from '../../../helpers/axiosHelper';


const Reserves = () => {
  
  const [usersReseve, setUsersReserve] = useState([]);
  console.log('usersReseve', usersReseve);

  useEffect(() => {
    const getBooking = async () => {
      let result = await fetchData('admin/getBooking', 'get', null, null);
      console.log('result del front', result);
      setUsersReserve(result.data.bookingReserve);
    };
    getBooking();
  }, []);

  
  return (
    <section>
      <Container>
        <Row>
          {usersReseve.map((elem) => {
            return (
              <Col key={elem.booking_id}>
                <CardReserve userReseve={elem} setUsersReserve={setUsersReserve} usersReseve={usersReseve}/>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Reserves;
