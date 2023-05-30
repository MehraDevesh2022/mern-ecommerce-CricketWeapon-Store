import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ExitToApp as LogoutIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";
const ProfilePage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isAuthenticated } = useSelector((state) => state.userData);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
    history.push("/login");
  };
  useEffect(() => {
    // if user not logged in
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  const createdAt = (user) => {
    const createdAt = new Date(user.createdAt);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    const formatter = new Intl.DateTimeFormat("en-IN", options);
    const formattedDate = formatter.format(createdAt);
    return formattedDate;
  };

  return (
    <div className="rootProfile">
      <div className="header-root">
        <Typography variant="h5" component="h1" className="headingProfile">
          Hi, {user.name} !
        </Typography>

        <Typography variant="body2" className="greeting">
          Welcome back! Happy shopping!
        </Typography>
      </div>

      <div className="profileConatiner">
        <div className="leftCotainer">
          <h4
          
            className="profileHeadingLeft"
          >
            Profile Overview
          </h4>
          <div className="profileSection">
            <Avatar
              alt={user.name}
              src={user.avatar.url}
              className="profileAvatar"
            />
            <div className="leftDetails">
              <Typography className="profileText">
                <h5 className="profileSubHeading">Name :</h5>
                {user.name}
              </Typography>
              <Typography className="profileText">
                <h5 className="profileSubHeading">Email : </h5>
                {user.email}
              </Typography>
              <Typography className="profileText">
                <h5 className="profileSubHeading">Member since :</h5>{" "}
                {createdAt(user)}
              </Typography>
            </div>
          </div>

          <div className="myOrder">
            <Typography variant="h4" component="h1" className="profileHeading">
              Orders
            </Typography>
            <Link
              to="/orders"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button variant="contained" className="ordersButton">
                Orders
              </Button>
            </Link>
          </div>
        </div>

        <div className="rightConatiner">
          <div className="righHeadings">
            <Typography variant="h4" component="h1" className="profileHeading">
              Personal Information
            </Typography>
            <Typography className="profileText2">
              Hey there ! Feel free to edit any of your details below so your
              account is up to date.
            </Typography>
          </div>
          <div className="profileDetials">
            <div className="detials">
              <Typography
                variant="h4"
                component="h1"
                className="profileHeading"
              >
                MY DETAILS
              </Typography>
              <Typography className="profileText">{user.name}</Typography>
              <Typography className="profileText">USER EMAIL</Typography>
              <Typography className="profileText"> PHONE NUMBER</Typography>
              <Typography className="profileText">GENDER</Typography>
            </div>

            <Link to="/profile/update" style={{ textDecoration: "none" }}>
              <Button variant="contained" className="profileButton">
                EDIT DETAILS
              </Button>
            </Link>
            <div className="detials">
              <Typography
                variant="h4"
                component="h1"
                className="profileHeading"
                style={{ marginTop: "1.5rem" }}
              >
                LOGIN DETAILS
              </Typography>
              <Typography className="profileSubHeading">EMAIL</Typography>
              <Typography className="profileText">{user.email}</Typography>

              <Typography
                className="profileSubHeading"
                style={{ marginTop: "10px" }}
              >
                PASSWORD
              </Typography>
              <Typography className="profileSubHeading">
                *************
              </Typography>
            </div>
            <Link
              to="/password/update"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button variant="contained" className="profileButton">
                UPDATE PASSWORD
              </Button>
            </Link>

            <div className="mangeAccount">
              <Typography
                variant="h4"
                component="h1"
                className="profileHeading"
              >
                Log out from all devices
              </Typography>

              <p className="profileText3">
                To access the Cricket Weapon Store website again, you need to
                provide your credentials. This action will log you out from any
                other web browsers you have used before.
              </p>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="profileButton"
              startIcon={<LogoutIcon />}
              onClick={logoutHandler}
            >
              Logout Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
