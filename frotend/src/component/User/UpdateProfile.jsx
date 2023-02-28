import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layouts/loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateProfile,
  load_UserProfile,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstanat";
import MetaData from "../layouts/MataData/MataData";
import { useHistory } from "react-router-dom";
import profile from "../../Image/Profile.png";

function UpdateProfile() {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileData
  );
 const {user} = useSelector(state =>state.userData)


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile);

  // submit upadated profile detials such as avatar , email , name && fro pass we have seperte api for that
  const UpdateProfileSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  // if user wants change image so setAvatar from here
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    // async function invoked
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]); // get first image if there multiple pic selected
  };

  useEffect(() => {
    // letsay if user not update name and change other data then we setting all data from prv user data initaily for name , email, avatar
   
    if (user) {
      // console.log(user, "user");
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // isUpadted is nothing But success message from response. once user updated then pop the message and show profile data
    if (isUpdated) {
                     console.log(isUpdated);
                     alert.success("Profile Updated Successfully");
                     // now get user New data from backend
                     dispatch({
                       type: UPDATE_PROFILE_RESET,
                     });

                     // now reset all value . eg : isUpdate : false and all
                     dispatch({
                       type: UPDATE_PROFILE_RESET,
                     });

                    
                     history.push("/account");

                      dispatch(load_UserProfile());

                   }
  }, [dispatch, error, alert, history, user, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data" // for image
                onSubmit={UpdateProfileSubmitHandler}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="upadateProfileName">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    name="avatar"
                    type="file"
                    accept="image/*" // all type file
                    onChange={updateProfileDataChange}
                  />
                </div>
                <button className="updateProfileBtn">Update</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateProfile;
