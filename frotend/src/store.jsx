import {createStore ,combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer , productDetailsReducer } from "./reducers/productReducers";
import { profileReducer, userReducer , forgetPasswordReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { json } from "body-parser";
 
const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  userData: userReducer,
  profileData: profileReducer,
  forgetPassword: forgetPasswordReducer,
  // cart: cartReducer,
});

// get all Cart values from local storage and pass this initial state into store
let initialState = {
  cartData: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
  },
};


const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
