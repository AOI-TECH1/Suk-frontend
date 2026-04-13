import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Img from '../assets/Frame.png';

const Login = () => {
  return (
    <div className="login-page">
      <Container className='w-50%' >
        <Row className="vh-100 align-items-center">
          
          {/* LEFT SIDE */}
          <Col md={6} className="px-5">
            <h3 className="mb-2">Log in to SuK</h3>
            <p className="text-muted">Enter your details</p>

            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Email or Phone Number"
                  className="custom-input error"
                />
                <small className="text-danger">
                  The email address is incomplete
                </small>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="custom-input"
                />
              </Form.Group>

              <div className="d-flex align-items-center">
                <Button className="login-btn">Log In</Button>
                <a href="#" className="ms-3 text-danger small">
                  Forget Password?
                </a>
              </div>
            </Form>
          </Col>

          {/* RIGHT SIDE */}
          <Col md={6} className="text-center">
            <img src={Img} alt="cart" className="img-fluid w-75" />
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Login;