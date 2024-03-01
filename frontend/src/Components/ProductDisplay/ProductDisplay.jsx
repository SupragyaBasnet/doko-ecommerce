import React, { useContext } from "react";
import { Row, Col, Image, Button, Container } from "react-bootstrap";
import "./ProductDisplay.css";

import { ShopContext } from "../../Context/ShopContext";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, cartItems } = useContext(ShopContext);

  return (
    <Container className="productdisplay w-100 ">
      <Row>
        <Col className="productdisplay-left w-100">
          <div className="productdisplay-img">
            <Image
              className="productdisplay-main-img"
              src={product.image}
              alt=""
            />
          </div>
        </Col>
        <Col className="productdisplay-right">
          <h1>{product.name}</h1>
          {/* <div className="productdisplay-right-stars">
            <Image src={start_icon} alt="" />
            <Image src={start_icon} alt="" />
            <Image src={start_icon} alt="" />
            <Image src={start_icon} alt="" />
            <Image src={start_dull_icon} alt="" />
            <p>(122)</p>
          </div> */}
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
              ${product.price}
            </div>
            <div className="productdisplay-right-price-new">
              ${product.discounted_price}
            </div>
          </div>

          <div className="product-display-right-discription">
            {product.description}
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-size">
              {product.sizes.split(",").map((item, id) => {
                return <div>{item}</div>;
              })}
            </div>
          </div>
          <Button
            onClick={() => {
              addToCart(product);
            }}
          >
            ADD TO CART
          </Button>
          <p className="productsiaplay-right-category">
            <span>Category:</span>
            {product.category}
          </p>
          <p className="productsiaplay-right-category">
            <span>Tags:</span>
            {product.tags}
          </p>
        </Col>
      </Row>
      <Tabs
        defaultActiveKey="description"
        id="uncontrolled-tab-example"
        className="my-4"
      >
        <Tab eventKey="description" title="Description">
          <p>{product.description}</p>
        </Tab>
        {/* <Tab eventKey="reviews" title="Reviews">
          Tab content for Profile
        </Tab> */}
      </Tabs>
    </Container>
  );
};

export default ProductDisplay;
