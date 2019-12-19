import React, { useState } from "react";
import { withRouter } from 'react-router';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Auth } from "aws-amplify";
import { ContainerWrapper } from "./HelloWorld";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const processSignIn = user => {
    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      Auth.completeNewPassword(user, "Test@123")
        .then(user => console.log("signinuser: ", user))
        .catch(error => setErrorMsg(error.message));
    } else {
      sessionStorage.setItem("authToken", user.IdToken);
      const { history } = props;
      history.push("./helloworld");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    Auth.signIn({ username: email, password })
      .then(user => processSignIn(user))
      .catch(error => setErrorMsg(error.message));
  };

  return (
    <ContainerWrapper>
      <Form>
        <div className="text-danger">{errorMsg}</div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </ContainerWrapper>
  );
};

export default withRouter(Login);
