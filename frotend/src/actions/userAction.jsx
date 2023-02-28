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
} from "../constants/userConstanat";


// login user
export function login(email, password) {
 
  return async function(dispatch) {
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
export function signUp(signupData){
   
    return async function(dispatch){
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
              console.log(data);
             dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

         

       } catch (error) {
        console.log(error);
           dispatch({type : REGISTER_USER_FAIL , payload : error.message})
       }

    }

}

// Load User (user Profile) if logged in before

export const load_UserProfile = () => async (dispatch) =>{

 try {
  dispatch({ type: LOAD_USER_REQUEST });
 
  const { data } = await axios.get("api/v1/profile");
   
  dispatch({type : LOAD_USER_SUCCESS , payload : data.user})
  
 } catch (error) {

    dispatch({type : LOAD_USER_FAIL , payload : error.message})
 }

}

// logout user 
export  function logout (){
  return async function(dispatch){
   try {
     await axios.get(`/api/v1/logout`); // token will expired from cookies and no more user data access
   dispatch({ type: LOGOUT_SUCCESS });

   } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.message });
   }
  }
}


// Update Profile => 

export function updateProfile(userData) {
         return async function(dispatch){
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


                  dispatch({
                    type: UPDATE_PROFILE_SUCCESS,
                    payload: data.success,
                  });
                } catch (error) {
              console.log(error);
                dispatch({type : UPDATE_PROFILE_FAIL , payload : error.message})
            }
         }
       }


export function updatePassword(userPassWord) {
         return async function(dispatch){
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
         
                dispatch({type : UPDATE_PASSWORD_FAIL , payload : error.message})
            }
         }
       }


export function forgetPassword(email) {
         return async function(dispatch) {
           try {
             dispatch({ type: FORGOT_PASSWORD_REQUEST });

             const config = {
               headers: { "Content-Type": "application/json" },
             };

             const { data } = await axios.put(
               `/api/v1//password/forgot`,
               email,
               config
             );

             dispatch({
               type: FORGOT_PASSWORD_SUCCESS,
               payload: data.message,
             });
           } catch (error) {
             dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.message });
           }
         };
       }

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};