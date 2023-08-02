import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import CricketBallLoader from "../layouts/loader/Loader";
import MetaData from "../layouts/MataData/MataData";
import { Link } from "react-router-dom";
import { signUp, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./LoginFromStyle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

function Signup() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [areCheckboxesChecked, setAreCheckboxesChecked] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  const history = useHistory();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated, error } = useSelector((state) => state.userData);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      alert.success("User Registered Successfully");
      history.push("/account");
    }
  }, [dispatch, isAuthenticated, loading, error, alert , history]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handleAvatarChange = (event) => {

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
    
      };
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setIsValidName(newName.length >= 4 && newName.length <= 20);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
      setIsValidPassword(event.target.value.length >= 8);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = (checkboxName) => (event) => {
    setAreCheckboxesChecked((prevState) => ({
      ...prevState,
      [checkboxName]: event.target.checked,
    }));
  };

  let isSignInDisabled = !(
    email &&
    password &&
    isValidEmail &&
    confirmPassword &&
    name &&
    isValidName &&
    areCheckboxesChecked.checkbox1 &&
    areCheckboxesChecked.checkbox2
  );

  function handleSignUpSubmit(e) {
      setLoading(true);
    e.preventDefault();
  

    if (password !== confirmPassword) {
      alert.error("Password and Confirm Password do not match");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(signUp(formData));
    setLoading(false);
  }

  return (
    <>
      <MetaData title={"Sign Up"} />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
              Sign Up for an Account ! 
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              className={`${classes.nameInput} ${classes.textField}`}
              value={name}
              onChange={handleNameChange}
              error={!isValidName && name !== ""}
              helperText={
                !isValidName && name !== "" ? "Name must be between 4 and 20 characters." : ""
              }
            />

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
              error={!isValidPassword && password !== ""}
               helperText={ !isValidPassword && password !== "" ? "Password must be at least 8 characters." : ""}
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
            <TextField
              label="Confirm Password"
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
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <div className={classes.root}>
              <Avatar
                alt="Avatar Preview"
                src={avatarPreview}
                className={classes.avatar2}
              />
              <input
                accept="image/*"
                className={classes.input}
                id="avatar-input"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-input">
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                  component="span"
                  className={classes.uploadAvatarButton}
                >
                  <p className={classes.uploadAvatarText}>Upload Avatar</p>
                </Button>
              </label>
            </div>

            <Grid
              container
              className={classes.gridcheckbox}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I Accept The Cricket Weapon Terms & Conditions"
                  className={classes.checkbox}
                  checked={areCheckboxesChecked.checkbox1}
                  onChange={handleCheckboxChange("checkbox1")}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I Accept The Cricket Weapon Terms Of Use"
                  className={classes.checkbox}
                  checked={areCheckboxesChecked.checkbox2}
                  onChange={handleCheckboxChange("checkbox2")}
                />
              </Grid>
            </Grid>

            <Typography
              variant="body2"
              className={classes.termsAndConditionsText}
            >
              I acknowledge Cricket Weapon will use my information in accordance
              with its
              <Link href="#" className={classes.privacyText}>
                Privacy Policy.
              </Link>
            </Typography>

            <Button
              variant="contained"
              className={classes.loginButton}
              fullWidth
              onClick={handleSignUpSubmit}
              disabled={isSignInDisabled || loading}
            >
              Create Account
            </Button>

            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              Already have an account?
              <Link to="/login" className={classes.createAccount}>
                Login
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}

export default Signup;
