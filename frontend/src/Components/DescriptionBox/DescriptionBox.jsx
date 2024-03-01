import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to include Bootstrap styles
import "./DescriptionBox.css";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const DescriptionBox = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="my-4"
      >
        <Tab eventKey="description" title="Description">
          <p>
            An e-commerce website is a digital platform that facilitates the
            buying and selling of goods or services over the internet. These
            websites have become integral to modern retail, providing businesses
            with a way to reach a global audience and customers with the
            convenience of shopping from the comfort of their homes. E-commerce
            websites showcase products or services with detailed descriptions,
            high-quality images, and sometimes videos. This helps customers make
            informed purchase decisions. Users can add items to a virtual
            shopping cart and proceed to checkout, where they provide shipping
            details and payment information. Secure and user-friendly checkout
            processes are crucial for a positive customer experience.
          </p>
        </Tab>
        {/* <Tab eventKey="reviews" title="Reviews">
          Tab content for Profile
        </Tab> */}
      </Tabs>
    </Container>
  );
};

export default DescriptionBox;
