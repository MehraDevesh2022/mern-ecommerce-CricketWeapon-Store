import { ADD_TO_CART , REMOVE_CART_ITEM } from "../constants/cartConstant";


export function cartReducer(state = { cartItems: []} , action) {

switch (action.type) {
  case ADD_TO_CART:
    const item = action.payload;
// find if product exist in cartItem already
 const isExist  = state.cartItems.find(cartItem =>{
    return cartItem.productId == item.productId

 })

 console.log(action.payload);
 // if exist alerady then replace same product 
 if(isExist){
    return {
 
      cartItems: state.cartItems.map((cartItem) => {
    
        return item.productId === cartItem.productId ? item : cartItem;
      }),
    };
 }
 // if not exist then add new item value into cartItem
 else{
    return {
        ...state ,
        cartItems : [...state.cartItems ,item]
    }
 }
 default : return state
}


}


