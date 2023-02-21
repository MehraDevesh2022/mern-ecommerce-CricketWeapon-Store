import React, {  useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layouts/loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch , useSelector } from "react-redux";
import { useAlert } from "react-alert";

function LoginSignUp() {

    const [loginEmail , setLoginEmail] = useState("");
    const [loginPassword , setLoginPassWord] = useState("");


  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p>LOGIN</p>
              <p>REGISTER</p>
            </div>
            <button ></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSignUp;
