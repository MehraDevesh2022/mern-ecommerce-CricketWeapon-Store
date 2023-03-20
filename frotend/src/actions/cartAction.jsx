import { ADD_TO_CART, REMOVE_CART_ITEM ,SAVE_SHIPPING_INFO } from "../constants/cartConstant";
import axios from "axios";

// Add to Cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  //getState method used for getting state value at action action
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      productId: data.Product._id,
      name: data.Product.name,
      price: data.Product.price,
      image: data.Product.images[0].url,
      stock: data.Product.Stock,
      quantity,
    },
  });

  // getState().cart.cartItem using this we are accessing cartItem from state directly and stroing at local storage .  because humne koi api nhi bnayi backend main for cartItem

  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};





// remove item action =>
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};



// Shipping info =>
export const saveShippingInfo = (data) => async (dispatch, getState) => {
         dispatch({
           type: SAVE_SHIPPING_INFO,
           payload: data,
         });
         localStorage.setItem("shippingInfo", JSON.stringify(data));

         // localStorage.setItem("shippingInfo" , json.stringify(getState.cart.shippingInfo))
       };