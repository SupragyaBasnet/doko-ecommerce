import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Popular.css";
import data_product from "../Assets/data";

import ItemNoClick from "../Item/ItemNoClick";

const Popular = () => {
  return (
    <Container className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <Row className="popular-items">
        {data_product.map((item, i) => (
          <Col xs={12} md={3} lg={3}>
            <ItemNoClick
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Popular;
