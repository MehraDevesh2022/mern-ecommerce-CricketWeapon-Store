import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../component/layouts/MataData/MataData"
import Loader from "../layouts/loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();
    const { user, loading, isAuthenticated } = useSelector(
      (state) => state.userData
    );
    useEffect(() =>{
      // if user not logged in
      if(isAuthenticated ===false){
        history.push("/login");
      }
    },[history , isAuthenticated])

    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <MetaData title={`${user.name}'s Profile`} />
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt={user.name} />
                <Link to="/profile/update">Edit Profile</Link>
              </div>

              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>

                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>

                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>

                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
}

export default Profile;
