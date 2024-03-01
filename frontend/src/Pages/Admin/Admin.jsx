import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Admin = () => {
  return (
    <Container fluid className="admin">
      <Row>
        <Col md={2} className="sidebar-col">
          <h1>Admin</h1>
        </Col>
        <Col md={10} className="content-col"></Col>
      </Row>
    </Container>
  );
};

export default Admin;
