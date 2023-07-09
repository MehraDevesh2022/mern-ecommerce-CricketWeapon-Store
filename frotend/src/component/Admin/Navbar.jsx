import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    background: "#ffffff",

    width: "100%",
    padding: "1rem ",
    boxShadow:
      "1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.2), 4px 4px 8px rgba(0, 0, 0, 0.3)",

    // Responsive styles
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "0.5rem",
    },
    [theme.breakpoints.between("sm", "md")]: {
      flexDirection: "row",
      alignItems: "center",
      padding: "1rem",
    },
  },
  dashboard: {
    fontSize: "2rem",
    fontWeight: 900,
    color: "black",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",

    // Responsive styles
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "2rem",
      marginBottom: 0,
      marginRight: "2rem",
    },
  },
  contactButton: {
    padding: "10px 20px",
    borderRadius: "20px",
    boxShadow: "0px 2px 8px 0px #0000000a",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
    color: "#fff",
    letterSpacing: "1px",
    background: "#414141",
    transition: "background-color 0.3s",

    // Responsive styles
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      padding: "8px 16px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "16px",
      padding: "10px 20px",
    },

    "&:hover": {
      background: "#ed1c24",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <div className={classes.dashboard}>Dashboard</div>
      <Button className={classes.contactButton}>Contact Us</Button>
    </nav>
  );
};

export default Navbar;
