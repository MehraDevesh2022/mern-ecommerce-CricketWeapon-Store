import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CloseIcon from "@material-ui/icons/Close";
import "./SideBar.css";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import IconButton from "@material-ui/core/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { logout } from "../../../actions/userAction";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgb(37, 37, 37)",
    webkitBoxShadow: "7px 10px 7px -2px rgba(79,78,79,0.75)",
    mozkitBoxShadow: "7px 10px 7px -2px rgba(79,78,79,0.75)",
    boxShadow: "7px 10px 7px -2px rgba(79,78,79,0.75)",
  },

  closeBtn: {
    position: "absolute",
    top: theme.spacing(-0.5),
    right: theme.spacing(0.1),
    color: "#FFFFFF",
    fontSize: "2px",

    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#E30605",
      color: "#fff",
    },
  },

  listItem: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
    borderRadius: "5px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "#E30605",
      boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.4)",
      color: "FFFFFF",
    },
  },

  listItemText: {
    color: "#FFFFFF",
    "&svg": {
      fill: "#FFFFFF",
    },
    "&:hover": {
      color: "White",
    },
  },

  icon: {
    color: "#FFFFFF",
  },
}));

function Sidebar({ handleSideBarMenu, isAuthenticated ,user }) {
  const classes = useStyles();
  const dispatch  = useDispatch()
  const alert  = useAlert();
  const logOutHandler = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <IconButton className={classes.closeBtn} onClick={handleSideBarMenu}>
        <CloseIcon />
      </IconButton>
      <List style={{ marginTop: "20px" }}>
        {isAuthenticated && user.role === "admin" && (
          <Link
            to="/admin/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItem button key="Dashboard" className={classes.listItem}>
              <ListItemIcon className={classes.icon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Link>
        )}
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <ListItem button key="Home" className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        </Link>

        <Link
          to="/products"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItem button key="Products" className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText
              primary="Products"
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        </Link>

        <Link
          to="/contact"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItem button key="Contact" className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <ContactPageIcon />
            </ListItemIcon>
            <ListItemText
              primary="Contact"
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        </Link>

        <Link
          to="/about_us"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItem button key="About Us" className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              primary="About Us"
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        </Link>

        <Link
          to="/account"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItem button key="Account" className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Account"
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        </Link>
        {isAuthenticated ? (
          <ListItem button key="Logout" className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <ExitToAppIcon onClick={logOutHandler} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        ) : (
          <Link
            to="/login"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItem button key="Login" className={classes.listItem}>
              <ListItemIcon className={classes.icon}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText
                primary="Login"
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Link>
        )}
      </List>
    </Drawer>
  );
}

export default Sidebar;
