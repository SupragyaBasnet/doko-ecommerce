import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pinterest_icon from "../Assets/pinterest_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row>
        <Col xs={12} md={3} className="footer-logo">
          <img src={footer_logo} alt="" />
          <p>DOKO</p>
        </Col>
        <Col xs={12} md={3} className="footer-links">
          <ul>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </Col>
        <Col xs={12} md={3} className="footer-social-icon">
          <Row>
            <Col>
              <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
              </div>
            </Col>
            <Col>
              <div className="footer-icons-container">
                <img src={pinterest_icon} alt="" />
              </div>
            </Col>
            <Col>
              <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="" />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={3} className="footer-copyright">
          <hr />
          <p>&copy; 2024 - All Rights Reserved</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
