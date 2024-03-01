import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import upload_area from "../../Assets/upload_area.svg";
import styles from "./AddProduct.module.css";
import Alert from "react-bootstrap/Alert";

import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

export const AddProduct = () => {
  const location = useLocation();
  const axios = useAxiosPrivate();

  console.log(location);
  const [productDetails, setProductDetails] = useState(
    (location.state && location.state.product) || {
      name: "",
      image: null,
      category: "women",
      discounted_price: 0,
      price: 0,
      sizes: "",
      tags: "",
      type: 0,
      description: "",
      file: null,
    }
  );

  const [saved, setSaved] = useState(false);

  const imageHandler = (e) => {
    console.log("image click");
    setProductDetails({ ...productDetails, file: e.target.files[0] });
  };

  const nameChangeHandler = (e) => {
    setProductDetails({ ...productDetails, name: e.target.value });
  };

  const priceChangeHandler = (e, type) => {
    const value = e.target.value;
    setProductDetails({
      ...productDetails,
      [type]: /^\d*\.?\d+$/.test(value) ? parseFloat(value) : "",
    });
  };

  const categoryChangeHandler = (e) => {
    setProductDetails({ ...productDetails, category: e.target.value });
  };

  const sizesChangeHandler = (e) => {
    setProductDetails({ ...productDetails, sizes: e.target.value });
  };

  const tagsChangeHandler = (e) => {
    setProductDetails({ ...productDetails, tags: e.target.value });
  };

  const typeChangeHandler = (e) => {
    setProductDetails({ ...productDetails, type: e.target.value });
  };

  const descriptionChangeHandler = (e) => {
    setProductDetails({ ...productDetails, description: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    if (productDetails.id) {
      console.log("updating item");
      axios
        .put(
          `/admin/items/${productDetails.id}`,
          {
            ...productDetails,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setSaved(true);
          console.log(response);
        });
    } else {
      axios
        .post(
          "/admin/items",
          {
            ...productDetails,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setSaved(true);
          console.log("data posted");
          console.log(response);
        });
      // Add your logic to send data to the server or perform other actions here
    }
  };

  return (
    <Container>
      {saved && (
        <Alert key="Success" variant="Success">
          Item saved Successfully.
        </Alert>
      )}

      <Form className={styles.add_product}>
        <Row className={styles.addproduct_itemfield}>
          <Form.Group as={Col} controlId="formProductTitle">
            <Form.Label>Product title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type here"
              value={productDetails.name}
              onChange={nameChangeHandler}
            />
          </Form.Group>
        </Row>
        <Row className={styles.addproduct_price}>
          <Form.Group as={Col} controlId="formOldPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type"
              value={productDetails.price}
              onChange={(e) => priceChangeHandler(e, "price")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formNewPrice">
            <Form.Label>Offer Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type"
              value={productDetails.discounted_price}
              onChange={(e) => priceChangeHandler(e, "discounted_price")}
            />
          </Form.Group>
        </Row>
        <Row className={styles.addproduct_itemfield}>
          <Form.Group as={Col} controlId="formProductCategory">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type"
              value={productDetails.category}
              onChange={categoryChangeHandler}
            />
          </Form.Group>
        </Row>
        <Row className={styles.addproduct_itemfield}>
          <Form.Group as={Col} controlId="formProductSizes">
            <Form.Label>Sizes</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type here"
              value={productDetails.sizes}
              onChange={sizesChangeHandler}
            />
          </Form.Group>
        </Row>
        <Row className={styles.addproduct_itemfield}>
          <Form.Group as={Col} controlId="formProductTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type here"
              value={productDetails.tags}
              onChange={tagsChangeHandler}
            />
          </Form.Group>
        </Row>
        <Row className={styles.addproduct_itemfield}>
          <Form.Group as={Col} controlId="formProductType">
            <Form.Label>Type</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={typeChangeHandler}
              value={productDetails.type}
            >
              <option>Select Type</option>
              <option value="1">Men</option>
              <option value="2">Women</option>
              <option value="3">Kids</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className={styles.addproduct_itemfield}>
          <Form.Group as={Col} controlId="formProductDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textArea"
              placeholder="Type here"
              value={productDetails.description}
              onChange={descriptionChangeHandler}
            />
          </Form.Group>
        </Row>
        <Row className={styles.addproduct_itemfield}>
          <Form.Group as={Col}>
            <Form.Label htmlFor="file_input">
              <img
                src={
                  productDetails.file
                    ? URL.createObjectURL(productDetails.file)
                    : upload_area
                }
                className={styles.addproduct_thumbnail_img}
                alt=""
              />
            </Form.Label>
            <Form.Control
              type="file"
              name="image"
              id="file_input"
              onChange={imageHandler}
              hidden
            />
          </Form.Group>
        </Row>
        <Row className={styles.addproduct_itemfield}>
          <Button
            variant="primary"
            onClick={() => {
              Add_Product();
            }}
            className={styles.addproduct_btn}
          >
            {productDetails.id ? "UPDATE" : "ADD"}
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default AddProduct;
