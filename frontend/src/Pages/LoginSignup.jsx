import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import Login from "./Login";
import React from "react";
import "./CSS/LoginSignup.css";
import useAuth from "../Hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

const REGISTER_URL = "auth/register";

function LoginSignup() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPrivate = useAxiosPrivate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        REGISTER_URL,

        JSON.stringify({
          email: email,
          password: pass,
          username: user,
          phoneNumber: phone,
        })
      );

      const accessToken = response?.data?.accessToken;
      const roles = jwtDecode(accessToken)["a"];
      setAuth({ user, pass, accessToken, roles });
      setUser("");
      setPass("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setErrMsg(err?.response);
      if (!err?.response) {
        console.log("No server respoonse", err);
      } else if (err?.response?.status === 400) {
        console.log("Missing username or password");
      } else if (err?.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
        setErrMsg("Login Failed!");
      }
    }
  };
  return (
    <Container fluid className="login">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="my-4">
            <h1 className="text-center">SignUp</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter Username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="Phone-Number"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mb-3">
                Signup
              </Button>
              <p>
                Already have an account? <a href="/login">Login here</a>
              </p>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="By continuing, I agree to the terms of use and privacy policy"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* Display the Login component when the URL matches "/login" */}
      {window.location.pathname === "/login" && <Login />}
    </Container>
  );
}

export default LoginSignup;
