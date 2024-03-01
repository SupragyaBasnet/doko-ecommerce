import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
export const Offers = () => {
  return (
    <>
      <Container fluid className="offers">
        <Container>
          <Row className="justify-content-sm-center">
            <Col sm="12" md="5" className="my-auto">
              <h1>Exclusive Offers For You</h1>
              <div>
                <div className="hero-hand-icon">
                  <p>ONLY ON BEST SELLERS PRODUCTS</p>
                </div>
                {/* <div>
                  <button>Check Now</button>
                </div> */}
              </div>
            </Col>
            <Col sm="12" md="5">
              <Image src={exclusive_image} alt="" fluid />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
export default Offers;
