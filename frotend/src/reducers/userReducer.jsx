
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
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
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
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };

      case LOAD_USER_SUCCESS:
        return {
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
      case LOGOUT_SUCCESS:
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
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

       export const profileReducer = (state = {}, action) => {
                switch (action.type) {
                  case UPDATE_PROFILE_REQUEST:
                   case  UPDATE_PASSWORD_REQUEST :
                    return {
                      ...state,
                      loading: true,
                    };

                  case UPDATE_PROFILE_SUCCESS:
                    case UPDATE_PASSWORD_SUCCESS :
                    return {
                      ...state,
                      loading: false,
                      isUpdated: action.payload, // payLoad has success
                    };

                  case UPDATE_PROFILE_FAIL:
                    case UPDATE_PROFILE_FAIL :
                    return {
                      ...state,
                      loading: false,
                      error: action.payload, // error message
                    };

                  // once data upadted then for loading false and isUpdated false ..
                  case UPDATE_PROFILE_RESET:
                    case UPDATE_PASSWORD_RESET :
                    return {
                      ...state,
                      isUpdated: false,
                      loading: false,
                    };

                  case CLEAR_ERRORS:
                    return {
                      ...state,
                      error: null,
                    };
                  default:
                    return state;
                }
              };



      export const forgetPasswordReducer = (state = {}, action) => {
        switch (action.type) {
          case FORGOT_PASSWORD_REQUEST:
          case RESET_PASSWORD_REQUEST:
            return {
              ...state,
              loading: true,
              error: null,
            };
          case FORGOT_PASSWORD_SUCCESS:
            return {
              ...state,
              loading: false,
              message: action.payload,
            };
          case RESET_PASSWORD_SUCCESS:
            return {
              ...state,
              loading: false,
              success: action.payload,
            };

          case FORGOT_PASSWORD_FAIL:
          case RESET_PASSWORD_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };

          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };

          default:
            return state;
        }
        }


           