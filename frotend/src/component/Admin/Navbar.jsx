import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    background: "#ffffff",

    width: "100%",
    padding: "1rem",
    boxShadow:
      "1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.2), 4px 4px 8px rgba(0, 0, 0, 0.3)",

    [theme.breakpoints.between("999")]: {
      flexDirection: "row",
      alignItems: "center",
      padding: "1rem",
    },
  },

  menuIcon: {
    display: "none",
    [theme.breakpoints.down("999")]: {
      display: "block",
      fontSize: "2rem",
      "& svg": {
        fontSize: "2rem",
        "&:hover": {
          color: "#ed1c24",
        },
      },
      "&:hover": {
        transform: "scale(1.1)", // Hover scale effect
      },
    },
  },
  dashboardHead: {
    fontSize: "2rem",
    fontWeight: 900,
    color: "black",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",

    // Responsive styles
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
    },
    [theme.breakpoints.down("999")]: {
      fontSize: "1.8rem",
      marginBottom: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "1.3rem",
      fontSize: "1.8rem",

    },
  },
  contactButton: {
    padding: "10px 30px",
    borderRadius: "20px",
    boxShadow: "0px 2px 8px 0px #0000000a",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
    color: "#fff",
    letterSpacing: "1px",
    background: "#414141",
    transition: "background-color 0.3s",
    marginRight: "2rem",
    // Responsive styles
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      padding: "8px 14px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "14px",
      padding: "7px 15px",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },

    "&:hover": {
      background: "#ed1c24",
    },
  },
}));

const Navbar = ({ toggleHandler }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <IconButton className={classes.menuIcon} onClick={toggleHandler}>
        <MenuIcon fontSize="2rem" />
      </IconButton>
      <div className={classes.dashboardHead}>Dashbord</div>
      <Button className={classes.contactButton}>Contact Us</Button>
    </nav>
  );
};

export default Navbar;
