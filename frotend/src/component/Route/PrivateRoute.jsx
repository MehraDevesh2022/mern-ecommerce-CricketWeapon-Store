import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { load_UserProfile } from "../../actions/userAction";
// Where component is Component which one render using Private Route and ..rest will props path and all
function PrivateRoute({ isAdmin, component: Component, ...rest }) {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.userData
  );
  const dispatch  = useDispatch()
  useEffect(() =>{
   dispatch(load_UserProfile);
      
  } ,[dispatch])

  return (
    <>
      {loading === false && (
        <>
          <Route
            {...rest} // this is path passed as paramatre in PrivateRoute
            render={(props) => {
              if (isAuthenticated === false) {
                return <Redirect to="/login" />;
              }

              if (isAdmin === true && user.role != "admin") {
                return <Redirect to="/login" />;
              }
              return <Component {...props} />; //  props are value passed along with Component  at PrivateRoute
            }}
          ></Route>
        </>
      )}
    </>
  );
}

export default PrivateRoute;
