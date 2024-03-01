import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { Button, Image, Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { getTotalCartAmount, cartItems, address, clearCart } =
    useContext(ShopContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const shippingFee = 5; // Set your shipping fee here

  const subtotal = getTotalCartAmount();
  const total = subtotal + shippingFee;
  let index = 1;

  const submitOrder = () => {
    console.log("submit order");
    let order = {
      shipping: shippingFee,
      deliveryDate: format(
        new Date(new Date().setDate(new Date().getDate() + 2)),
        "yyyy-MM-dd"
      ),
      address: address,
      orderItems: [],
    };

    Object.keys(cartItems).map((id) => {
      let item = cartItems[id]["product"];
      let orderItem = {
        quantity: cartItems[id]["count"],
        name: item["name"],
        price: item["discounted_price"],
        imageName: item["imageName"],
      };
      order["orderItems"].push(orderItem);
    });

    axiosPrivate
      .post("user/orders", {
        ...order,
      })
      .then((response) => {
        clearCart();
        navigate("/shop");
        console.log(response);
      });
  };

  console.log(cartItems);
  return (
    <Container className="py-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Products</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cartItems).map((key) => {
            const item = cartItems[key]["product"];
            const count = cartItems[key]["count"];
            console.log(count, item);
            return (
              <tr key={item.id}>
                <td>{index++}</td>
                <td>
                  {" "}
                  <Image
                    src={item.image}
                    alt=""
                    className="custom-carticon-product-icon"
                  />
                </td>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>${item.discounted_price}</p>
                </td>
                <td>{count}</td>
                <td>
                  <p>${item.discounted_price * count}</p>
                </td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td>
              <h1>Cart Totals</h1>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <p>Subtotal</p>
            </td>
            <td></td>
            <td></td>
            <td>${getTotalCartAmount()}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>Shipping Fee</td>
            <td></td>
            <td></td>
            <td>${shippingFee}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <h3>Total</h3>
            </td>
            <td></td>
            <td></td>
            <td>
              <h3>${total}</h3>
            </td>
          </tr>
        </tbody>
      </Table>

      <Row className="justify-content-end">
        <Col lg={4}>
          <div className="custom-cartitems-total">
            <Button variant="primary" onClick={() => submitOrder()}>
              CONFIRM ORDER
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
