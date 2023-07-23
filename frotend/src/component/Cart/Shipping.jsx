import React from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layouts/MataData/MataData";
import CheckoutSteps from "./CheckoutSteps ";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  shippingRoot: {
    width: "60%",
    margin: "auto",
  },
  heading: {
    marginBottom: theme.spacing(2),
    alignSelf: "flex-start",
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 200,
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "50%",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    height: "3rem",
    "&:hover": {
      backgroundColor: "#ed1c24",
      color: "#FFFFFF",
    },
  },
  outlinedInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000000",
      },
      "&:hover fieldset": {
        borderColor: "#000000", 
      },
      "&.Mui-focused fieldset": {
        borderColor: "#000000", 
      },
    },
    "& .MuiInputBase-input": {
      color: "#000000", 
    },
    "& .MuiInputLabel-root": {
      color: "#000000", 
    },
  },


}));

const Shipping = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const { shippingInfo } = useSelector((state) => state.cart);

  const classes = useStyles();
  const [address, setAddress] = React.useState(shippingInfo.address);
  const [firstName, setFirstName] = React.useState(shippingInfo.firstName);
  const [lastName, setLastName] = React.useState(shippingInfo.lastName);
  const [city, setCity] = React.useState(shippingInfo.city);
  const [pinCode, setPinCode] = React.useState(shippingInfo.pinCode);
  const [state, setState] = React.useState(shippingInfo.state);
  const [country, setCountry] = React.useState(shippingInfo.country || "India");
  const [phoneNo, setPhone] = React.useState(shippingInfo.phoneNo || "");
  const [email, setEmail] = React.useState(shippingInfo.email);
  const [saveAddress, setSaveAddress] = React.useState(false);
  const [sameBillingDelivery, setSameBillingDelivery] = React.useState(false);
const [isValidEmail, setIsValidEmail] = React.useState(true);
const [isPhoneNoValid, setIsPhoneNoValid] = React.useState(true);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setPinCode(event.target.value);
  };

  const handleStateChange = (event) => {

    setState(event.target.value);
  };

  const handleCountryChange = (value) => {
    setCountry(value.label);
  };

  const handlePhoneChange = (event) => {
    const newPhoneNo = event.target.value;
    setPhone(newPhoneNo);
    setIsPhoneNoValid(newPhoneNo !== "" && newPhoneNo.length === 10);
  }; 

 const handleEmailChange = (event) => {
   const newEmail = event.target.value;
   
   setEmail(newEmail);
   setIsValidEmail(
     newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
   );
 };

  const handleSaveAddressChange = (event) => {
    setSaveAddress(event.target.checked);
  };

  const handleSameBillingDeliveryChange = (event) => {
    setSameBillingDelivery(event.target.checked);
  };

 const handleSubmit = (event) => {
   event.preventDefault();

   if (
     email === "" ||
     firstName === "" ||
     lastName === "" ||
     address === "" ||
     city === "" ||
     state === "" ||
     country === "" ||
     pinCode === "" ||
     phoneNo === ""
   ) {
     alert.error("Please fill all the fields");
     return;
   }

   if (phoneNo && phoneNo.length !== 10) {
     alert.error("Phone Number should be 10 digits Long");
     return;
   }

   dispatch(
     saveShippingInfo({
       address,
       city,
       state,
       country,
       pinCode,
       phoneNo,
       email,
       firstName,
       lastName,
     })
   );
   history.push("/process/payment");
 };


  



  return (
    <>
      <div className="shippingPage">
        <MetaData title={"Shipping Info"} />
        <CheckoutSteps activeStep={1} />

        <div className="shippingPage__container">
          <div className="shippingPage__container__left">
            <div className={classes.shippingRoot}>
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" className={classes.heading}>
                  SHIPPING ADDRESS
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      value={firstName}
                      onChange={handleFirstNameChange}
                      className={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      value={lastName}
                      onChange={handleLastNameChange}
                      className={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      fullWidth
                      value={address}
                      onChange={handleAddressChange}
                      className={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="City"
                      variant="outlined"
                      fullWidth
                      value={city}
                      onChange={handleCityChange}
                      className={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Pincode"
                      variant="outlined"
                      fullWidth
                      value={pinCode}
                      onChange={handlePincodeChange}
                      className={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="State"
                      variant="outlined"
                      fullWidth
                      value={state}
                      onChange={handleStateChange}
                      className={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Country"
                      variant="outlined"
                      fullWidth
                      value={country}
                      onChange={handleCountryChange}
                      className={classes.outlinedInput}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      value={phoneNo}
                      onChange={handlePhoneChange}
                      className={classes.outlinedInput}
                      error={!isPhoneNoValid && phoneNo !== ""}
                      helperText={
                        !isPhoneNoValid &&
                        phoneNo &&
                        "Please enter a valid phone number."
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      className={classes.outlinedInput}
                      error={!isValidEmail && email !== ""}
                      helperText={
                        !isValidEmail &&
                        email &&
                        "Please enter a valid email address."
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={saveAddress}
                          style={{ color: "#000000" }}
                          onChange={handleSaveAddressChange}
                        />
                      }
                      label="Save Address to Address Book"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={sameBillingDelivery}
                          style={{ color: "#000000" }}
                          onChange={handleSameBillingDeliveryChange}
                        />
                      }
                      label="My billing and delivery information are the same."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submitButton}
                     
                    >
                      Continue
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
