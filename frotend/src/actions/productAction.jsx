import axios from 'axios';
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productsConstatns"

// get ALL Products
export const getProduct = (
         keyword = "",
         currentPage = 1,
         price = [0, 100000],
         category,
         ratings =0
       ) => {
         return async (dispacth) => {
         
           try {
             // initial state :
             dispacth({
               type: ALL_PRODUCT_REQUEST,
             });

             // get product from backend
             let link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
             // when category selected by user then using another link

             if (category) {
               link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`;
             }
             const { data } = await axios.get(link);
            //  console.log(data);
             dispacth({
               type: ALL_PRODUCT_SUCCESS,
               payload: data,
             });
           } catch (error) {
             dispacth({
               type: ALL_PRODUCT_FAIL,
               payload: error.response.data.message,
             });
           }
         };
       };
// Get Products Details
// id is from productDetails as {match} arg
export const getProductDetails   = (id) => {
 return async (dispacth) => {
   try {
  
     dispacth({
       type: PRODUCT_DETAILS_REQUEST,
     });

     const { data } = await axios.get(`/api/v1/product/${id}`);

     dispacth({
       type: PRODUCT_DETAILS_SUCCESS,
       payload: data.Product,
     });
   } catch (error) {
     dispacth({
       type: PRODUCT_DETAILS_FAIL,
       payload: error.response.data.message,
     });
   }
 };


}

// clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

