import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
import axios from "axios";
import { extractErrorMessage } from "../utils/apiErrorHandler";

// Add to Cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  try {
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

    // Save cart data to localStorage after dispatching the action
    localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    // Log silently — cart errors are non-critical; the UI will show stale data
    console.error("Add to cart failed:", extractErrorMessage(error));
  }
};

// Remove item from Cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  // Save cart data to localStorage after dispatching the action
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  // Save shipping info data to localStorage after dispatching the action
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
