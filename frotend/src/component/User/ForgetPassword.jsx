import React, { useState, useEffect } from "react";
import LockClockIcon from "@mui/icons-material/LockClock";
import { TextField, Button, Typography, Avatar } from "@material-ui/core";
import useStyles from "./LoginFromStyle";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import CricketBallLoader from "../layouts/loader/Loader";

import { Link } from "react-router-dom";

export default function ForgetPassowrd() {
  const classes = useStyles();
 
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading } = useSelector(
    (state) => state.forgetPassword
  );

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  function handleforgotPasswordSubmit(e) {
     e.preventDefault();
    setIsDone(!isDone);
 
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgetPassword(myForm));
    
  }

  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
      setEmail("");
    }
  }, [dispatch, error, alert, message, loading]);

  const isSignInDisabled = !(email && isValidEmail);

  return (
    <>
      <MetaData title="Forget Password" />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={handleforgotPasswordSubmit}>
            <Avatar className={classes.avatar}>
              <LockClockIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
              Forgot your password?
            </Typography>

            {isDone && (
              <Typography
                variant="body1"
                align="center"
                style={{ color: "#007500" }}
              >
                An email regarding your password change has been sent to your
                email address.
              </Typography>
            )}

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={`${classes.emailInput} ${classes.textField}`}
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ""}
              helperText={
                !isValidEmail && email !== ""
                  ? "Please enter a valid email address."
                  : ""
              }
            />

            <Button
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: "3rem" }}
              onClick={handleforgotPasswordSubmit}
            >
              Send email
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: ".3rem" }}
            >
              <Link to="/login" className={classes.createAccount}>
                Cancel
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}
