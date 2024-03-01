import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./CSS/LoginSignup.css"; // Make sure to import your CSS file
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import useAuth from "../Hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import axios from "../API/axios";

const LOGIN_URL = "auth/login";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPrivate = useAxiosPrivate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(LOGIN_URL);
    try {
      const response = await axiosPrivate.post(
        LOGIN_URL,

        JSON.stringify({
          email: user,
          password: pass,
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
        {errMsg?.length > 0 ? (
          <Alert key="danger" variant="danger">
            {errMsg}
          </Alert>
        ) : (
          <div></div>
        )}
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="my-4">
            <h1 className="text-center">Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="Email"
                  placeholder="Enter Email"
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mb-3">
                Login
              </Button>
              {/* Don't have an account? Signup here link */}
              <p>
                Don't have an account? <Link to="/signup">Signup here</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;
