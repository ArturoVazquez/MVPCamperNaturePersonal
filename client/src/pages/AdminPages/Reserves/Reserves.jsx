import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { CardReserveAdmin } from '../../../components/CardReserveAdmin/CardReserveAdmin';
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
                <CardReserveAdmin userReseve={elem} setUsersReserve={setUsersReserve} usersReseve={usersReseve} key={elem.booking_id}/>
              
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Reserves;
