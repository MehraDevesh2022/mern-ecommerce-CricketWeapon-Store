import {createStore ,combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer , productDetailsReducer } from "./reducers/productReducers";
import { userReducer } from "./reducers/userReducer";

 
const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  userData : userReducer
});


const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
