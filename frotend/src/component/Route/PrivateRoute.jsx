import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ isAdmin, component: Component, ...rest }) {
  const { isAuthenticated, user } = useSelector((state) => state.userData);
 
  return (
    <>
      {isAuthenticated === true ? (
        <Route
          {...rest}
          render={(props) => {
            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default PrivateRoute;
