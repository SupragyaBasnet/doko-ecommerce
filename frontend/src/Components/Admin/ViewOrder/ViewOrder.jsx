import React, { useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import "./ViewOrder.css"; // Make sure to include your CSS file
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return orders.reduce(
      (total, order) => total + order.quantity * order.price,
      0
    );
  };

  useEffect(() => {
    axiosPrivate
      .get("admin/orders")
      .then((response) => {
        if (response.status === 200 && response.data.httpStatus === "OK") {
          setOrders(response.data.dataArray);
        }
        console.log(response.data.dataArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const viewDetails = (orderId) => {
    // Implement logic to mark order as completed
    console.log("Order Completed:", orderId);
    navigate("/admin/vieworderdetails", {
      state: { order: orders.find((order) => order.id === orderId) },
    });
  };

  const getTotal = (items) => {
    let sum = 0;
    items.map((item) => (sum += item.price * item.quantity));
    return sum;
  };

  return (
    <Container>
      <div className="view_order mt-4">
        <h1>View Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.N.</th>
              <th>UserName</th>
              <th>Price</th>
              <th>Shipping</th>
              <th>Address</th>
              <th>DeliveryDate</th>
              <th>Status</th>
              <th>Action</th> {/* New column header */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.user.email}</td>
                <td>${getTotal(order.orderItems)}</td>
                <td>{order.shipping}</td>
                <td>{order.address}</td>
                <td>{order.deliveryDate}</td>
                <td>{order.complete ? "Delivered" : "Pending"}</td>
                <td>
                  <Button
                    onClick={() => viewDetails(order.id)}
                    variant="success"
                  >
                    View Details
                  </Button>
                  {/* Button to mark order as Done */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="total">
          <strong>Total:</strong> ${calculateTotal()}
        </div>
      </div>
    </Container>
  );
};

export default ViewOrder;
