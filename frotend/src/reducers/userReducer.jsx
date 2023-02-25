
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
} from "../constants/userConstanat";


export const userReducer = (state = { user: {} }, action) => {

    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_USER_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };

      case LOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };

      case LOGIN_FAIL:
      case REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };

      case LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };

      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      case LOGIN_SUCCESS:
        return {
          isAuthenticated: false,
          loading: false,
          user: null,
        };

      case LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
       };

       export const profileRedcuer = (state = {} , action) =>{

            switch(action.type){

          case UPDATE_PROFILE_REQUEST :
            return {
            ...state,
            loading : true

            }

            case UPDATE_PROFILE_SUCCESS : 
            return{
              ...state ,
              loading : false,
              isUpdated : action.payload // payLoad has success
            }

            case UPDATE_PROFILE_FAIL :
              return {
                ...state,
                loading : false,
                error : action.payload // error message
              }
            
            case UPDATE_PROFILE_RESET :
              return{
                ...state,
                isUpdated : false,
                loading : false
              }
            
            case CLEAR_ERRORS :
              return {
                ...state,
                error : null
              }
             default : return state
            }
       }