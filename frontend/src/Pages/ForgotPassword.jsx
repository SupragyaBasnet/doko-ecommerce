// ForgotPassword.js
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CSS/ForgotPassword.css"; // Make sure to import your CSS file

function ForgotPassword() {
  return (
    <Container fluid className="forgot-password-container">
      {" "}
      {/* Updated class name */}
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="my-4">
            <h1 className="text-center">Forgot Password</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Button variant="primary" type="submit" className="mb-3">
                Reset Password
              </Button>
            </Form>
            <p>
              Remember your password? <Link to="/login">Login here</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ForgotPassword;
