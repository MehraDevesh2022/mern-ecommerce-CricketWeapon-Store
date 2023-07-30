import React from "react";
import {
  Divider,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MetaData from "../component/layouts/MataData/MataData";
const useStyles = makeStyles((theme) => ({
  root_contactus: {
    padding: "8rem 0",
    backgroundColor: "white",
    width: "100%",
    overflow: "hidden",
  },
  contact_Container_contactus: {
    width: "70%",
    margin: "0 auto",
  },
  title_contact_us: {
    color: "#414141",
    fontSize: "1.5rem !important",
    padding: "1rem 3rem",
    fontFamily: "Roboto",
    fontWeight: "700 !important",
    letterSpacing: "2px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px ",
      padding: "1rem 0",
    },
  },
  divider_contact: {
    width: "90%",
    backgroundColor: "#b6b6b6",
    margin: "2rem 0 !important",
  },
  helpTitle_contact_us: {
    fontSize: "18px",
    color: "black",
    padding: "2rem 0",
  },
  para_contact: {
    paddingBottom: "3rem",
    marginLeft: "0.5rem",
    color: "#414141",
    lineHeight: "1.5rem",
    fontSize: "16px !important",
    width: "90%",
    letterSpacing: "2px",
    [theme.breakpoints.down("sm")] :{
      width : "100%"
    }
  },
  address_contacts: {
    paddingBottom: "3rem",
    marginLeft: "0.5rem",
    color: "#414141",
    lineHeight: "1.5rem",
    fontSize: "16px !important",
    width: "90%",
    letterSpacing: "2px",
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
    },
  },
  supportButton: {
    backgroundColor: "#292929 !important",
    color: "white !important",
    width: "fit-content !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "3.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#ed1c24 !important",
      color: "white !important",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "15px !important",
    },
  },
  callButton: {
    backgroundColor: "#292929 !important",
    color: "white   !important",
    width: "fit-content     !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "1.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#ed1c24 !important",
      color: "white !important",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.8rem 3.4rem   !important",
    },
  },
  formContainer_container: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  formField_contact: {
    // marginBottom: "2rem",
    width: "100%",
  },
  submitButtons: {
    alignSelf: "flex-start",
    backgroundColor: "#292929 !important",
    color: "white   !important",
    width: "fit-content     !important",
    padding: "1rem 3rem   !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#ed1c24 !important",
      color: "white !important",
    },
  },
  SelectOption_contact: {
    width: "100%",
    marginBottom: "2rem",
    "& .MuiOutlinedInput-root_contactus": {
      "& fieldset": {
        borderColor: "#000",
        borderRadius: "none !important",
      },
      "&:hover fieldset": {
        borderColor: "#000",
        "&.Mui-focused fieldset": {
          borderColor: "#000",
        },
      },
    },
    "& .MuiSelect-root_contactus": {
      backgroundColor: "white",
      color: "black",
    },
    "& .MuiSelect-icon": {
      color: "black",
    },
    "& .MuiList-root_contactus": {
      backgroundColor: "white",
      color: "black",
    },
  },
  lableText_contact: {
    color: "#000",
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "1rem",
  },
  menu_contact: {
    "& .MuiList-root_contactus": {
      backgroundColor: "white",
      color: "black",
    },
  },
}));

const ContactForm = () => {
  const classes = useStyles();
  const alert = useAlert();
  const history = useHistory();
  const handleCall = () => {
    window.location.href = "tel:+8171280446";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert.success("Your message has been sent successfully");
    history.push("/");
  };

  return (
    <Box className={classes.root_contactus}>
      <MetaData  title={"Contact Us"}/>
      <div className={classes.contact_Container_contactus}>
        <Typography variant="h2" className={classes.title_contact_us}>
          Contact Us
        </Typography>

        <Divider className={classes.divider_contact} />

        <Typography variant="h4" className={classes.helpTitle_contact_us}>
          Need Help?
        </Typography>

        <Typography variant="body2" className={classes.para_contact}>
          We have live chat available, look for the chat icon in the lower right
          hand corner of this page. If it isn’t there, then give us a call at{" "}
          <strong
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleCall}
          >
            8171280446
          </strong>
          .
        </Typography>

        <Typography variant="body2" className={classes.para_contact}>
          <span className={classes.para2}>7:00-6:00 MST Monday-Friday</span>
          <br />
          <span className={classes.para2}>9:00-4:00 MST Saturday</span>
          <br />
          <span className={classes.para2}>Closed Sunday</span>
        </Typography>

        <Typography variant="body2" className={classes.para_contact}>
          Catch us outside these hours? Fill out our support form below, and
          we'll be in touch shortly.
        </Typography>

        <Typography variant="body2" className={classes.address_contacts}>
          <span style={{ fontWeight: "500", paddingBottom: "0.5rem" }}>
            CricketWeapon Store, Pvt Ltd.
          </span>
          <br />
          15130 Sec 22
          <br />
          Noida, UP 201301
          <br />
          India
        </Typography>

        <div className={classes.buttonGroup}>
          <a href="#issue-select" style={{ textDecoration: "none" }}>
            <Button variant="contained" className={classes.supportButton}>
              Support Form
            </Button>
          </a>

          <Button
            variant="contained"
            className={classes.callButton}
            onClick={handleCall}
          >
            Call Us
          </Button>
        </div>

        <Divider className={classes.divider_contact} />
        <div className={classes.supportForm}>
          <Typography
            variant="h4"
            className={classes.title_contact_us}
            style={{ paddingBottom: "1rem" }}
          >
            Support Form
          </Typography>

          <Typography variant="body2" className={classes.para_contact}>
            Need a quicker answer? Look for our chat icon on the right hand side
            of this page.
          </Typography>

          <form
            className={classes.formContainer_container}
            onSubmit={handleSubmit}
          >
            <div className={classes.SelectOption_contact}>
              <Typography variant="body2" className={classes.lableText_contact}>
                ISSUE *
              </Typography>
              <FormControl className={classes.formField_contact}>
                <Select
                  labelId="issue-label"
                  id="issue-select"
                  defaultValue="e-commerce"
                  MenuProps={{
                    classes: { paper: classes.menu_contact },
                  }}
                >
                  <MenuItem value="e-commerce">E-Commerce</MenuItem>
                  <MenuItem value="app">App</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={classes.SelectOption_contact}>
              <Typography variant="body2" className={classes.lableText_contact}>
                DETAIL *
              </Typography>
              <FormControl className={classes.formField_contact}>
                <Select
                  labelId="detail-label"
                  id="detail-select"
                  defaultValue="others"
                  MenuProps={{
                    classes: { paper: classes.menu_contact },
                  }}
                >
                  <MenuItem value="availability">Availability</MenuItem>
                  <MenuItem value="return/exchange">Return/Exchange</MenuItem>
                  <MenuItem value="technical-support">
                    Technical Support
                  </MenuItem>
                  <MenuItem value="invoicing">Invoicing</MenuItem>
                  <MenuItem value="tracking-info">Tracking Info</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={classes.SelectOption_contact}>
              <Typography variant="body2" className={classes.lableText_contact}>
                Language *
              </Typography>
              <FormControl className={classes.formField_contact}>
                <Select
                  labelId="language-label"
                  id="language-select"
                  defaultValue="english"
                  MenuProps={{
                    classes: { paper: classes.menu_contact },
                  }}
                >
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="hindi">Hindi</MenuItem>
                  <MenuItem value="japanese">Japanese</MenuItem>
                  <MenuItem value="chinese">Chinese</MenuItem>
                  <MenuItem value="german">German</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={classes.SelectOption_contact}>
              <Typography variant="body2" className={classes.lableText_contact}>
                {" "}
                EMAIL *
              </Typography>
              <FormControl className={classes.formField_contact}>
                <TextField
                  placeholder="Enter Your Email *"
                  id="email-input"
                  type="email"
                />
              </FormControl>
            </div>

            <div className={classes.SelectOption_contact}>
              <Typography variant="body2" className={classes.lableText_contact}>
                {" "}
                MESSAGE *
              </Typography>
              <FormControl className={classes.formField_contact}>
                <TextField
                  id="message-textarea"
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="Enter Your Message *"
                />
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              className={classes.submitButtons}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Box>
  );
};

export default ContactForm;
