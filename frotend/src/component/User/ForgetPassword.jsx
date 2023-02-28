import React, { useState, useEffect } from "react";
import "./ForgetPassword.css";
import { useDispatch , useSelector } from "react-redux";
import { forgetPassword ,  clearErrors} from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData"
import Loader from "../layouts/loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

function ForgetPassword() {
     const dispatch = useDispatch();
     const alert = useAlert();
     const {error , message , loading} = useSelector(state => state.forgetPassword)

     const [email, setEmail] = useState("");

     function handleforgotPasswordSubmit(e){
            e.preventDefault();
              const myForm = new FormData();
                 myForm.set("email", email); 
                 dispatch(forgetPassword(myForm))
     }

     useEffect(()=>{
           if (error) {
             alert.error(error);
             dispatch(clearErrors());
           }

             if (message) {
               alert.success(message);
             }
     } ,[dispatch, error, alert, message , loading])


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                onSubmit={handleforgotPasswordSubmit}
                className="forgotPasswordForm"
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button className="forgotPasswordBtn">Send</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForgetPassword