import React from "react";
import {
    Route,
    Redirect,
  } from "react-router-dom";
  import isEmpty from 'lodash/isEmpty';

export const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = !isEmpty(localStorage.getItem('CognitoIdentityServiceProvider.4kdu8iogg3clusldll0ae4rb0b.a4cc1383-96b4-4736-994a-1924da3cbda2.idToken'));
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
