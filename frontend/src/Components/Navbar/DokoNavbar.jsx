import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Outlet } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import "./DokoNavbar.css";
import Footer from "../Footer/Footer";
import useAuth from "../../Hooks/useAuth";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const DokoNavbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const totalCartItems = getTotalCartItems();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth(undefined);
    navigate("/");
  };
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="light"
        data-bs-theme="light"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              DOKO
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/shop">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/men">
                <Nav.Link>Men</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/women">
                <Nav.Link>Women</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/kids">
                <Nav.Link>Kids</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {auth?.user ? (
                <>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {auth?.user}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Nav.Item style={{ marginLeft: "10px" }}>
                    {/* Empty Nav.Item for spacing */}
                  </Nav.Item>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/cart">
                <div className="cart-icon-container">
                  <div className="cart-badge-container">
                    <img src={cart_icon} alt="" width="30" height="30" />
                    {totalCartItems > 0 && (
                      <span className="cart-badge">{totalCartItems}</span>
                    )}
                  </div>
                </div>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <Footer />
    </>
  );
};

export default DokoNavbar;
