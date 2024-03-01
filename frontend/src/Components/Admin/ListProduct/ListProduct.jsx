import React, { useState, useEffect } from "react";
import { Container, Card, Table } from "react-bootstrap";
import styles from "./ListProduct.module.css";
import cross_icon from "../../Assets/cross_icon.png";
import edit_icon from "../../Assets/edit_icon.png";
import { useNavigate } from "react-router-dom";
// import { ShopContext } from "../../../Context/ShopContext";
import { fetchAPIProducts, DeleteAPIItem } from "../../Common/DokoAPILibrary";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

export const ListProduct = () => {
  console.log("ListProduct Called");
  // const { products, setProducts, DeleteItem } = useContext(ShopContext);
  const axiosPrivate = useAxiosPrivate();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [type, setType] = useState(undefined);
  const [limit, setLimit] = useState(100);
  const pageSize = 100;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("mounted");
    fetchAPIProducts(page, limit, type).then((items) => {
      setProducts((prevProducts) => {
        console.log("prevProducts", prevProducts);
        const mergedArray = [...prevProducts, ...items];
        return mergedArray.filter(
          (value, index) => mergedArray.indexOf(value) === index
        );
      });

      if (items.length < limit) {
        setLastPage(true);
      } else {
        setLastPage(false);
      }
    });
  }, []);

  const FetchMoreProducts = () => {
    if (!lastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const DeleteItem = (itemId) => {
    axiosPrivate
      .delete(`admin/items/${itemId}`)
      .then((response) => {
        setProducts((products) =>
          products.filter((product) => product.id !== itemId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditItem = (itemId) => {
    navigate("/admin/editproduct", {
      state: { product: products.find((product) => product.id === itemId) },
    });
  };

  return (
    <Container>
      <div className={styles.list_product}>
        <h1>All Products List</h1>
        <Card>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Title</th>
                  <th>Old Price</th>
                  <th>New Price</th>
                  <th>Sizes</th>
                  <th>Category</th>
                  <th>Tags</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={product.image}
                        alt=""
                        className={styles.listproduct_format_product_icon}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.discounted_price}</td>
                    <td>{product.sizes}</td>
                    <td>{product.category}</td>
                    <td>{product.tags}</td>
                    <td>{product.type}</td>
                    <td>
                      <img
                        className={styles.listproduct_remove_icon}
                        src={cross_icon}
                        alt=""
                        onClick={() => {
                          DeleteItem(product.id);
                        }}
                      />
                      <img
                        className={styles.listproduct_edit_icon}
                        src={edit_icon}
                        alt=""
                        onClick={() => {
                          EditItem(product.id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default ListProduct;
