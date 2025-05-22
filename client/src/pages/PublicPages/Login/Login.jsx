import React, { useState } from 'react'
import { useContext } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContextProvider';
const initialValue = {
  email: "",
  password: ""
}
const Login = () => {
  const [loginData, setLoginData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("")
  const {login} = useContext(AuthContext);
  console.log('loginData', loginData)

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setLoginData({...loginData, [name]: value})
  }

  const onSubmit = async () =>{
    try {
      login(loginData);
    } catch (error) {
      console.log('error en Login', error);
    }

  }
  return (
    <section>
      <Container>
        <Row className='justify-content-center'>
          <Col className='col-6'>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="EmailTextInput">
                  Email
                </Form.Label>
                <Form.Control
                  id="EmailTextInput"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="passwordTextInput">
                  Password
                </Form.Label>
                <Form.Control
                  id="passwordTextInput"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  />
              </Form.Group>
              
              
              <Button onClick={onSubmit}>Submit</Button>
            </Form>
            <p>{errorMsg}</p>
            <p>Si no estas registrado <Link to={"/"}>registrate aqui</Link></p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login;