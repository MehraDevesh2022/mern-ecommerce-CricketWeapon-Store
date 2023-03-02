import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory, useRouteMatch } from "react-router-dom";

import Loader from "../layouts/loader/Loader";

function ResetPassword() {
  const history = useHistory();
  const match = useRouteMatch();
 
  const dispatch = useDispatch();
  const alert = useAlert();
      
  const { error, success, loading } = useSelector(
    (state) => state.forgetPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function resetPasswordSubmitHandler(e) {
   console.log("hello");
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    
    dispatch(resetPassword(match.params.token, myForm));
  }

 

  useEffect(() => {
     console.log("hello");

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      history.push("/login");
    }
  }, [dispatch, error, alert, success, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form
                action="submit"
                onSubmit={resetPasswordSubmitHandler}
                className="resetPasswordForm"
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button className="resetPasswordBtn">Reset</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ResetPassword;
