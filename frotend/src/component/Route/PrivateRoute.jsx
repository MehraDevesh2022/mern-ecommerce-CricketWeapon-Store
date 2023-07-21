import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { load_UserProfile } from "../../actions/userAction";
import CricketBallLoader from "../layouts/loader/Loader";
function PrivateRoute({ isAdmin, element: Element, ...rest }) {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.userData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_UserProfile());
  }, [dispatch]);

  if (loading) {
    // Show loading spinner or any other placeholder while checking authentication status
    return <CricketBallLoader />;
  }

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          isAdmin ? (
            user.role === "admin" ? (
              <Element />
            ) : (
              <Redirect to="/login" />
            )
          ) : (
            <Element />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
