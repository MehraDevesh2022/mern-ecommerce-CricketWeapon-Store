import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,

  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  UPDATE_USER_REQUEST,
  USER_DETAILS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
} from "../constants/userConstanat";


// login user
export function login(email, password) {

  return async function (dispatch) {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );

      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {

      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
  };
}
// resgister user
export function signUp(signupData) {

  return async function (dispatch) {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const { data } = await axios.post(
        `/api/v1/register`,
        signupData,
        config
      );

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });



    } catch (error) {
  
      dispatch({ type: REGISTER_USER_FAIL, payload: error.message })
    }

  }

}

// Load User (user Profile) if logged in before

export const load_UserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    // Check if user data is available in session storage
    const userData = sessionStorage.getItem("user");
    if (userData !== "undefined" && userData && userData !== undefined ) {
      // Parse the user data from JSON format stored in session storage
      const user = JSON.parse(userData);
       dispatch({ type: LOAD_USER_SUCCESS, payload: user });
    } else {
      // If user data is not available in session storage, make a backend API call
      const { data } = await axios.get("api/v1/profile");
   
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });

      // Save the user data to session storage for future use
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};


// logout user 
export function logout() {
  return async function (dispatch) {
    try {
      sessionStorage.removeItem("user");
      await axios.get(`/api/v1/logout`); // token will expired from cookies and no more user data access
      dispatch({ type: LOGOUT_SUCCESS });

    } catch (error) {
      sessionStorage.removeItem("user");
      dispatch({ type: LOGOUT_FAIL, payload: error.message });
    }
  }
}


// Update Profile => 

export function updateProfile(userData) {
  return async function (dispatch) {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };


      const { data } = await axios.put(
        `/api/v1/profile/update`,
        userData,
        config
      );

     if(data.user !== undefined && data.user) {
      sessionStorage.removeItem("user");
       sessionStorage.setItem("user", JSON.stringify(data.user))
     }

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.message })
    }
  }
}


export function updatePassword(userPassWord) {
  return async function (dispatch) {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };


      const { data } = await axios.put(
        `/api/v1/password/update`,
        userPassWord,
        config
      );


      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {

      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.message })
    }
  }
}
// forgetPassword;

export function forgetPassword(email) {
  return async function (dispatch) {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `/api/v1/password/forgot`,
        email,
        config
      );

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.message });
    }
  };
}


// reset password action
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.message,
    });
  }
};


// get All user Action --> admin 
export const getAllUsers  = () =>async (dispatch) =>{
     
  try {

    dispatch({type : ALL_USERS_REQUEST})

    const { data } = await axios.get("/api/v1/admin/users");

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users});
    
  } catch (error) {
      dispatch({type : ALL_USERS_FAIL , payload : error.message})
  }

}

// get User details --> admin

export const getUserDetails = (id) => async (dispatch) => {
  try {
     dispatch({type : USER_DETAILS_REQUEST})
         const { data } = await axios.get(`/api/v1/admin/user/${id}`);
            dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });

  } catch (error) {
     dispatch({ type: USER_DETAILS_FAIL , error : error.message});
  }
}

// upadte user role ---> admin
export const updateUser = (id, userData) => async (dispatch) => {
       console.log(id);
  try {
     dispatch({type : UPDATE_USER_REQUEST})


     const config  = {headers : {"Content-Type" : "application/json"}}
     const { data } = await axios.put(
       `/api/v1/admin/user/${id}`,userData,
       config
       
     );
     console.log(data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });

  } catch (error) {
      dispatch({type : UPDATE_USER_FAIL , payload : error.message} )
  }

}

// detele User ---> admin

export const deleteUser  =(id) => async (dispatch) =>{
  try {
       dispatch({ type: DELETE_USER_REQUEST });
       
       const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch({type : DELETE_USER_SUCCESS , payload : data})

  } catch (error) {
      dispatch({type : DELETE_USER_FAIL , payload : error.message})
  }

}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
