import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/orderConstant";
import axios from "axios"

export const createOrder = (order) => async (dispatch) => {
         try {
           dispatch({ type: CREATE_ORDER_REQUEST });

           const config = { headers: { "Content-Type": "application/json" } };
           const { data } = await axios.post(
             "/api/v1/order/new",
             order,
             config
           );

           dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
         } catch (error) {
           dispatch({ type: CREATE_ORDER_FAIL, payload: error.message });
         }
       };




// clear errors 

export const clearErrors  = () => async (dispatch) =>{
   dispatch({type : CLEAR_ERRORS})
}