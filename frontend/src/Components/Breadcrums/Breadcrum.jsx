import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";
import Container from "react-bootstrap/Container";

const Breadcrum = (props) => {
  const { product } = props;
  const types = ["None", "MEN", "WOMEN", "KIDs"];

  // Check if product is defined and has the expected properties
  if (!product || !product.category || !product.name) {
    // Handle the case where product is undefined or lacks expected properties
    return <div className="breadcrum">Invalid Product Data</div>;
  }

  return (
    <Container>
      <Breadcrumb className="breadcrum-container my-5">
        <Breadcrumb.Item href="/">HOME</Breadcrumb.Item>
        <Breadcrumb.Item href="/shop">SHOP</Breadcrumb.Item>
        <Breadcrumb.Item active>{types[product.type]}</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
    </Container>
  );
};

export default Breadcrum;
