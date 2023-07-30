import React, { useState , useEffect } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";
import useStyles from "./LoginFromStyle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login, clearErrors } from "../../actions/userAction";
import CricketBallLoader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData"

export default function Login() {

    const history = useHistory();
    const loaction = useLocation();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { isAuthenticated, loading, error } = useSelector(
      (state) => state.userData
    );

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  

  const isSignInDisabled = !(email && password && isValidEmail);

  
    const redirect = loaction.search
      ? loaction.search.split("=")[1]
      : "/account";
   useEffect(() => {
     if (error) {
       alert.error(error);
       dispatch(clearErrors());
     }

     if (isAuthenticated) {
       history.push(redirect);
     }
   }, [dispatch, isAuthenticated, loading, error, alert , history , redirect]);

     function handleLoginSubmit(e) {
       e.preventDefault();
       dispatch(login(email, password));
     }


  return (
    <>
      <MetaData title={"Login"} />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form}>
            <Avatar className={classes.avatar}>
              <LockOpenIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
              Sign in to Your Account
            </Typography>
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
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={`${classes.passwordInput} ${classes.textField}`}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    className={classes.showPasswordButton}
                    onClick={handleShowPasswordClick}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              value={password}
              onChange={handlePasswordChange}
            />
            <Grid container className={classes.rememberMeContainer}>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Link
                  to="/password/forgot"
                  className={classes.forgotPasswordLink}
                >
                  Forgot your password?
                </Link>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              className={classes.termsAndConditionsText}
            >
              I accept the Cricket Weapon Terms of Use and acknowledge Cricket
              Weapon will use my information in accordance with its
              <Link to="/policy/privacy" className={classes.privacyText}>
                Privacy Policy.
              </Link>
            </Typography>
            <Button
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSignInDisabled}
              onClick={handleLoginSubmit}
            >
              Sign in
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              Don't have an account?
              <Link to="/signup" className={classes.createAccount}>
                Create Account
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}
