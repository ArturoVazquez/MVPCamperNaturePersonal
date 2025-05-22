import React, { useState } from 'react'
import { useContext } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import {Link, replace, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContextProvider';
import { loginSchema } from '../../../../schemas/loginSchemas';
import {ZodError} from 'zod';

const initialValue = {
  email: "",
  password: ""
}
const Login = () => {
  const [loginData, setLoginData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");
  const [valError, setValError] = useState()
  const {login} = useContext(AuthContext);
  console.log('loginData', loginData)
  console.log(errorMsg, 'errorMsg')
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setLoginData({...loginData, [name]: value})
  }

  const onSubmit = async () =>{
    try {
      loginSchema.parse(loginData)
      await login(loginData);
      
     
    } catch (error) {
      
      console.log('error en Login', error);

      if(error instanceof ZodError){
        //console.log('dasjhfjdsahfsadh',error.errors[0].message)
        let  objTemp = error.errors[0].message;
        setValError(objTemp)
      }
        //NO ME PINTA EL ERROR 
        setErrorMsg(error.response.data.message)
      
      
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
                  {valError && <p>{valError}</p>}
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