import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import HelloWorld from "./components/HelloWorld";
import { configureAmplify } from "./configureAmplify";
import { PrivateRoute } from "./PrivateRoute";

configureAmplify();

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/helloworld">
            <HelloWorld />
          </PrivateRoute>
          <div>Incorrect url</div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
