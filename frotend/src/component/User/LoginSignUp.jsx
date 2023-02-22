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

    const loginTab  = useRef(null);
    const registerTab  = useRef(null);
    const switchTab = useRef(null);

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p>LOGIN</p>
              <p>REGISTER</p>
            </div>
            <button ref={switchTab}></button>
          </div>

          <form
            className="loginForm"
            ref={loginTab}
            onSubmit={handleLoginSubmit}
          >
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassWord(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <button className="loginBtn">Login</button>
          </form>

          {/* signUp box */}

          <form
            ref={registerTab}
            onSubmit={handleSignUpSubmit}
            className="signUpForm"
            encType="multipart/form-data" // this is for file upLoad
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                name="password"
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*" // all type image
                onChange={registerDataChange}
              />
            </div>
            <button className="signUpBtn">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginSignUp;
