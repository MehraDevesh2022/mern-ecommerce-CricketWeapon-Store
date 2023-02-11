import axios from 'axios';
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productsConstatns"

// get ALL Products
export const getProduct = ()=> {
    return( async(dispacth) =>{

    try {
         // initial state :
        dispacth ({
                type : ALL_PRODUCT_REQUEST
            });

             // get product from backend
             let link = `/api/v1/product`;
             const {data} = await axios.get(link);
             dispacth ({
                type : ALL_PRODUCT_SUCCESS ,
                payload : data
             });

        
        
    } catch (error) {
        
             dispacth({
               type: ALL_PRODUCT_FAIL,
               payload: error.response.data.message,
             });

    }

    }) 
}

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

