import React ,{useState, useEffect} from 'react'
import "./UpdatePassword.css";
import Loader from "../layouts/loader/Loader"
import { useDispatch, useSelector } from "react-redux";
import { updatePassword , clearErrors } from '../../actions/userAction';
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstanat';
import MetaData from "../layouts/MataData/MataData"

import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {useHistory} from "react-router-dom"

function UpdatePassword() {
    console.log("hello password");
const history  = useHistory();
const dispatch = useDispatch();
const {loading , isUpdated , error } = useSelector(state => state.profileData);
const alert  = useAlert();
 const [oldPassword, setOldPassword] = useState("");
 const [newPassword, setNewPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");

 function updatePasswordSubmitHandler(e){
    e.preventDefault();
    const myForm  = new FormData();
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);

   dispatch(updatePassword(myForm));

 }
useEffect(()=>{
  if(error){
    alert.error(error);
    dispatch(clearErrors());
  }
  if(isUpdated){
 alert.success("Profile Updated Successfully");
   dispatch({
     type: UPDATE_PASSWORD_RESET,
   });
        history.push("/account");
  }
},[dispatch , error , alert , isUpdated , loading])


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />

          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmitHandler}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    name="newPassword"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button className="updatePasswordBtn">Update</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdatePassword