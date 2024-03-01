import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const Hero = () => {
  return (
    <>
      <Container fluid className="hero">
        <Container>
          <Row className="justify-content-sm-center">
            <Col sm="12" md="5" className="my-auto">
              <h2>NEW ARRIVALS ONLY</h2>
              <div>
                <div className="hero-hand-icon">
                  <p>new</p>
                  <img src={hand_icon} alt="" />
                </div>
                <p>collections</p>
                <p> for everyone</p>
              </div>
              {/* <div className="hero-latest-btn ">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
              </div> */}
            </Col>
            <Col sm="12" md="5" className="justify-content-xs-center">
              <Image src={hero_image} alt="" fluid />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
export default Hero;
