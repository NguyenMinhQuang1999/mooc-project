import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { useHistory, useLocation, useParams } from "react-router-dom";
import validator from 'validator'


const LoginScreen = () => {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('')

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    let checkValid = true;
    if (!validator.isEmail(email)) {
      checkValid = false;
      setEmailError('InValid Email')
    } else if(email.trim() == "") {
      checkValid = false;
      setEmailError('Email is required!')
    } else if(password.trim() == "") {
      checkValid = false;
      setEmailError('Passworf is required!')
    }
    if(checkValid) {
      setEmailError('');
      dispatch(login(email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {emailError && <Message variant="danger">{emailError}</Message>}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" className="my-3" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3 mt-3">
        <Col>
          <div className="mt-2">
          </div>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
