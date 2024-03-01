import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { ShopContext } from "../Context/ShopContext"; // Import ShopContext
// import axios from "axios";
import fetchAPIProducts from "../Components/Common/DokoAPILibrary";

const ShopCategory = (props) => {
  // common data for all items
  // const { products, setProducts } = useContext(ShopContext);
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  // const [type, setType] = useState(props.type);
  const pageSize = 2;

  const FetchProducts = (
    page = 0,
    limit = 10,
    type = null,
    setProductsCallback
  ) => {
    useEffect(() => {
      // console.log("mounted");
      fetchAPIProducts(page, limit, type).then((items) => {
        setProducts((prevProducts) => {
          const newProductList = [...prevProducts, ...items];
          return newProductList.filter(
            (product, index) =>
              newProductList.indexOf(product) === index && product.type == type
          );
        });

        if (items.length < limit) {
          setLastPage(true);
        } else {
          setLastPage(false);
        }
      });

      return () => {
        // console.log("unmounting");
        // console.log(products);
        // setPage(0);
        // setLastPage(false);
        // setType(undefined);
        // setProducts([]);
      };
    }, [page, limit, type]);
  };

  const FetchMoreProducts = () => {
    if (!lastPage) {
      setPage((prevPage) => prevPage + 1);
      // FetchProducts(page, 10, type);
    }
  };

  FetchProducts(page, pageSize, props.type, setProducts);

  return (
    <Container fluid className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <Row className="shopcategory-indexSort">
        {/* <Col>
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
        </Col> */}
        {/* <Col className="text-end">
          Sort by <img src={dropdown_icon} alt="" />
        </Col> */}
      </Row>
      <Row className="shopcategory-products">
        {products.map((item, i) => {
          return (
            <Col key={i} xs={12} sm={12} md={12} lg={12}>
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.discounted_price}
                old_price={item.price}
                product={item}
              />
            </Col>
          );
        })}
      </Row>
      <div className="shopcategory-loadmore" onClick={FetchMoreProducts}>
        Explore More
      </div>
    </Container>
  );
};

export default ShopCategory;
