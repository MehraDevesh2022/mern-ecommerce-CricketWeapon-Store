import React, { useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layouts/loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import profile from "../../Image/./Profile.png";

import { login ,signUp , clearErrors} from "../../actions/userAction";
import { useHistory } from "react-router-dom";

function LoginSignUp() {
   const history = useHistory();
  const dispacth  = useDispatch();
   const alert = useAlert();
 
 const { isAuthenticated, loading, error } = useSelector(
   (state) => state.userData
 );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassWord] = useState("");

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [signUpUser, setSignUpUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile);

  function handleLoginSubmit(e) {
    e.preventDefault();
      dispacth(login(loginEmail ,loginPassword))
  }

  // destructure  all signUpUser property for easy use
  const { name, email, password } = signUpUser;

  function handleSignUpSubmit(e) {
    e.preventDefault();
    const myForm = new FormData(); // it will create a form intsnce for posting form data with multiple property
    myForm.set("name", name); //  FormData.set() Sets a new value for an existing key inside a FormData object,
    myForm.set("email", email); //  or adds the key/value if it does not already exist.
    myForm.set("password", password);
    myForm.set("avatar", avatar);
     dispacth(signUp(myForm));
  }

  // this is from signup from onChange method for its object
  function registerDataChange(e) {
    if (e.target.name === "avatar") {
      const reader = new FileReader(); // used when we upalod and drag and drop file directly not work on path. it return 3 {redayState} => 0 : not upload || 1 : while uploading || 2 : uploaded
      // async function
      reader.onload = () => {
        if (reader.readyState === 2) {
          // while file uploaded done
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]); // reading first file from given file by user
    } else {
      setSignUpUser({
        ...signUpUser,
        [e.target.name]: e.target.value, // this is for signUp user : name , passowrd , email onChange handler
      });
    }
  }
  

  useEffect(() =>{
    console.log("hello");    
    if(error){
            alert.error(error)
            console.log(error ,"error");
            dispacth(clearErrors())
          }
          if(isAuthenticated){
                history.push("/account")

          }
  },[dispacth , isAuthenticated, loading , error , alert])
 
  // swicthTab for login || register user switching ui in same page with css trasnform
  function switchTabs(tabName) {
    if (tabName === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    // we will add or remove classes here just apposite of login tab block
    if (tabName === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  }

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs("login")}>LOGIN</p>
              <p onClick={(e) => switchTabs("register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
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
