import React, { useState } from "react";
import { Table, Container, Button, Row, Col } from "react-bootstrap";
import "./ViewOrder.css"; // Make sure to include your CSS file
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewOrderDetails = () => {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const order = location.state.order;
  console.log(order);

  const calculateTotal = () => {
    let sum = order.shipping;
    order.orderItems.map((item) => {
      sum += item.price * item.quantity;
    });

    return sum;
  };

  const completeOrder = () => {
    order.complete = true;
    axiosPrivate
      .put(`/admin/orders/${order.id}`, {
        ...order,
      })
      .then((response) => {
        console.log("order completed");
        navigate("/admin/vieworder");
      });
  };
  return (
    <Container>
      <div className="view_order mt-4">
        <h1>Order Details</h1>
        <Row>
          <Col lg="3">
            <label>{order.user.email}</label>
            <br />
            <label>{order.address}</label>
            <br />
            <label>{order.deliveryDate}</label>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index}</td>
                <td>
                  <img
                    style={{ width: 100 + "px" }}
                    src={`/image?imageName=${item.imageName}`}
                    alt=""
                  />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="total">
          <strong>Total:</strong> ${calculateTotal()}
        </div>
        <div>
          {order.complete ? (
            <div>
              <span>Order Complete</span>
            </div>
          ) : (
            <div>
              <Button onClick={() => completeOrder()} variant="success">
                Complete Order
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ViewOrderDetails;
