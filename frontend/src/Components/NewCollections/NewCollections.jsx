import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import new_collection from "../Assets/new_collections";
import ItemNoClick from "../Item/ItemNoClick";

const NewCollections = () => {
  return (
    <Container className="new-collections">
      <h1 className="text-center">NEW COLLECTIONS</h1>
      <Row className="collections">
        {new_collection.map((item, i) => (
          <Col key={i} xs={12} sm={3} md={3} lg={3}>
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

export default NewCollections;
