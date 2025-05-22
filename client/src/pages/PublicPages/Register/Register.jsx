import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './register.css';

const Register = () => {
  return (
    <section>
      <Container>
        <Row className="pt-5 mt-5 d-flex align-items-center text-center form">
          <Col md={12} lg={12}>
            <h1>No hace falta brújula</h1>
            <p>
              Sigue el formulario y acabarás donde se duerme mejor -en plena
              naturaleza
            </p>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">
                  Disabled input
                </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  placeholder="Disabled input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">
                  Disabled input
                </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  placeholder="Disabled input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">
                  Disabled input
                </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  placeholder="Disabled input"
                />
              </Form.Group>

              <Button type="submit">Submit</Button>

            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
