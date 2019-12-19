import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import styled from "styled-components";

export const ContainerWrapper = styled.div`
  margin: 5em auto;
  background: lightblue;
  border-radius: 5px;
  width: 50%;
  text-align: left;
  padding: 1em 1em;
`;

const getApiResponse = (setIsFetching, setApiResponse) => {
  setIsFetching(true);
  fetch(
    "https://qexh10maml.execute-api.ap-southeast-2.amazonaws.com/Prod/api/helloworld",
    {
      headers: {
        Accept: "application/json; text/plain; charset=utf-8",
        "Content-Type": "application/json; text/plain; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem(
          "CognitoIdentityServiceProvider.4kdu8iogg3clusldll0ae4rb0b.a4cc1383-96b4-4736-994a-1924da3cbda2.idToken"
        )}`
      }
    }
  )
    .then(response => response.text())
    .then(data => {
      setTimeout(() => {
        setIsFetching(false);
        setApiResponse(data);
      }, 2000);
    })
    .catch(error => {
      setIsFetching(false);
      setApiResponse(`error: ${JSON.stringify(error)}`);
    });
};

const sayHello = (setIsFetching, setSayHelloResponse, input) => {
  setIsFetching(true);
  fetch(
    `https://qexh10maml.execute-api.ap-southeast-2.amazonaws.com/Prod/api/helloworld/${input}`,
    {
      headers: {
        Accept: "application/json; text/plain; charset=utf-8",
        "Content-Type": "application/json; text/plain; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem(
          "CognitoIdentityServiceProvider.4kdu8iogg3clusldll0ae4rb0b.a4cc1383-96b4-4736-994a-1924da3cbda2.idToken"
        )}`
      }
    }
  )
    .then(response => response.text())
    .then(data => {
      setTimeout(() => {
        setIsFetching(false);
        setSayHelloResponse(data);
      }, 2000);
    })
    .catch(error => {
      setIsFetching(false);
      setSayHelloResponse(`error: ${JSON.stringify(error)}`);
    });
};

const CallApi = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [apiResponse, setApiResponse] = useState("api is not called yet");
  return (
    <div>
      <Form>
        <FormGroup>
          <FormGroup>
            {isFetching ? (
              <Form.Label>Calling Api...</Form.Label>
            ) : (
              <Form.Label>
                Response from HelloWorld api: {apiResponse}
              </Form.Label>
            )}
          </FormGroup>
          <Button onClick={() => getApiResponse(setIsFetching, setApiResponse)}>
            Call Api
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

const SayHello = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [sayHelloResponse, setSayHelloResponse] = useState(
    "api is not called yet"
  );
  const [input, setInput] = useState("Dileep");
  return (
    <div>
      <Form>
        <FormGroup>
          <FormGroup>
            {isFetching ? (
              <Form.Label>Calling Api...</Form.Label>
            ) : (
              <FormGroup>
                <Form.Control
                  type="input"
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                  }}
                  placeholder="Enter Name"
                />
                <Form.Label>
                  Response from HelloWorld api: {sayHelloResponse}
                </Form.Label>
              </FormGroup>
            )}
          </FormGroup>
          <Button
            onClick={() => sayHello(setIsFetching, setSayHelloResponse, input)}
          >
            Say Hello
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

const HelloWorld = () => {
  return (
    <div className="container">
      <ContainerWrapper>
        <CallApi />
      </ContainerWrapper>
      <ContainerWrapper>
        <SayHello />
      </ContainerWrapper>
    </div>
  );
};

export default HelloWorld;
