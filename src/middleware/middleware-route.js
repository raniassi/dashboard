import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { tokenAuth } from "./cookies-manager";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authToken, dataToken } = tokenAuth.tokenAuthenticated();
  const adminRoute = { ...rest };

  console.log(adminRoute);
  // console.log(tokenAuth.tokenAuthenticated());
  // console.log("auth token", authToken);
  // console.log("role id ", dataToken.role);
  // console.log("data admin token ", adminRoute.roles);
  // console.log("panjang role ", adminRoute.roles.length);
  if (!authToken) {
    return (
      <Redirect
        to={{
          pathname: "/404",
          state: {
            from: rest.path,
            errorMessage: "Harap login dahulu."
          }
        }}
      />
    );
  } else if (adminRoute.roles.length > 1) {
    console.log("masuk");
    return (
      <Route
        {...rest}
        render={propsRender =>
          authToken  ? (
            <Component {...propsRender} />
          ) : (
            <Redirect
              to={{
                pathname: "/404"
              }}
            />
          )
        }
      />
    );
  } else if (adminRoute.roles.length === 1) {
    console.log(dataToken.role === 0);

    if (authToken && dataToken.role == 0) {
      return (
        <Route
          {...rest}
          render={propsRender => <Component {...propsRender} />}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/404"
          }}
        />
      );
    }
  }

  return (
    <Route {...rest} render={propsRender => <Component {...propsRender} />} />
  );
};

const IsLoggedRoute = ({ component: Component, ...rest }) => (
  // console.log(tokenAuth.tokenAuthenticated());
  <Route
    {...rest}
    render={props => (
      <Component
        {...props}
        isLoginAuthenticated={tokenAuth.tokenAuthenticated().authToken}
      />
    )}
  />
);

export { PrivateRoute };
