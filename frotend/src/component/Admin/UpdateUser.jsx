import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MataData/MataData";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { UPDATE_USER_RESET } from "../../constants/userConstanat";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layouts/loader/Loader";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  updateUser1: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
    overflow: "hidden",
    margin: "-1.1rem 0 0 0",
    padding: 0,
  },
  firstBox_01: {
    width: "20%",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    [theme.breakpoints.down("999")]: {
      display: "none",
    },
  },

  toggleBox_01: {
    width: "16rem",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    zIndex: "100",
    position: "absolute",
    top: "58px",
    left: "17px",
  },
  secondBox_01: {
    width: "75%",

    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    margin: "-0.5rem 0 0 0",
    gap: "10px",
    justifyContent: "center",
    [theme.breakpoints.down("999")]: {
      width: "100%",
    },
  },
  navBar_01: {
    margin: "0rem",
  },
  formSection: {
    width: "100%",
    margin: "auto",
    borderRadius: "5px",
    height: "100vh",
    backgroundColor: "white",
    padding: "1rem 2rem",
  },
  form: {
    width: "350px",
    margin: "-1rem auto 0 auto",
    borderRadius: "5px",
    padding: "2rem",
  },

  avatar: {
    margin: " 8px auto",
    backgroundColor: "black",
  },
  textField: {
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black",
      padding: "12px 14px",
    },
    "& .MuiInputLabel-root": {
      color: "black",
      fontSize: "14px",
      textAlign: "center",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
      fontSize: "14px",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "black",
        color: "black",
      },
      "& .MuiOutlinedInput-input": {
        padding: "13px 8px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        color: "black",
        outline: "none",
      },
    },
  },

  heading: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    color: "#414141",
    fontWeight: "bold",
  },

  nameInput: {
    position: "relative",
    "& > label": {
      left: ".2rem",
    },
    padding: "4px 0px",
    fontSize: "1rem",
    width: "100%",
    marginBottom: theme.spacing(5.5),
    height: ".7rem",
  },

  loginButton: {
    color: "#fff",
    backgroundColor: "#000",
    border: "2px solid #000",
    margin: `${theme.spacing(3)}px 0`,
    marginTop: "1rem",
    "&:disabled": {
      backgroundColor: "#444444", // faded black
      color: "#FFFFFF",
      borderColor: "#444444",
    },
    "&:hover": {
      backgroundColor: "#ed1c24",
      color: "#fff",
      borderColor: "#ed1c24",
    },
  },
  select: {
    width: "100%",
    padding: "8px",
    marginBottom: theme.spacing(2),
    fontSize: "14px",
    borderRadius: "4px",

    border: "1px solid rgba(0, 0, 0, 0.267)",
    "&:focus": {
      outline: "none",
      border: "none",
    },
    "& .MuiList-root .MuiMenuItem-root:hover": {
      backgroundColor: "#ed1c24",
      color: "#fff",
    },
  },
  selectMenuPaper: {
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "#ed1c24",
      color: "#fff",
    },
  },
}));

function UpdateUser() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const userId = useRouteMatch().params.id;
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
    (state) => state.profileData
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [toggle, setToggle] = useState(false);
  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  useEffect(() => {
    // initial value user Details  getting initially user._id will be undefind then call will occures  g(etUserDetails(id)
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update User" />
          <div className={classes.updateUser1}>
            <div
              className={
                !toggle ? `${classes.firstBox_01}` : `${classes.toggleBox_01}`
              }
            >
              <Sidebar />
            </div>

            <div className={classes.secondBox_01}>
              <div className={classes.navBar_01}>
                <Navbar toggleHandler={toggleHandler} />
              </div>
              <div className={classes.formSection}>
                <form
                  className={`${classes.form} `}
                  onSubmit={updateUserSubmitHandler}
                >
                  <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h1"
                    className={classes.heading}
                  >
                    Update Role
                  </Typography>

                  <TextField
                    variant="outlined"
                    fullWidth
                    className={`${classes.nameInput} ${classes.textField}`}
                    label="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                 
                  />

                  <TextField
                    variant="outlined"
                    fullWidth
                    className={`${classes.nameInput} ${classes.textField}`}
                    label="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MailOutlineIcon
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div style={{ position: "relative" }}>
                    <label
                      htmlFor="role_field"
                      style={{
                        marginLeft: "10px",
                        fontSize: "12px",
                        width: "300px",
                        color: "#414141",
                      }}
                    >
                      Role*
                    </label>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={classes.select}
                      MenuProps={{
                        classes: { paper: classes.selectMenuPaper }, // Update the class name here
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      <MenuItem value="">
                        <em style={{ background: "inherit", color: "#414141" }}>
                          Choose Role
                        </em>
                      </MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.loginButton}
                    disabled={
                      updateLoading ? true : false || role === "" ? true : false
                    }
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateUser;


  