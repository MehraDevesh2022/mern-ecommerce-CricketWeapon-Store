import React from 'react'
import "./Cart.css";
import CartItemCard from './CartItemcard';
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from '../../actions/cartAction'; 
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

function Cart() {
 const dispatch = useDispatch();
  const {cartItems } = useSelector(state => state.cartData)

  function increaseQuantity(){
         const newQty = quantity + 1;
           if (stock <= quantity) {
             return;
           }
               dispatch(addItemToCart(id, newQty));
  }

 function decreaseQuantity(id ,  quantity){
        const newQty = quantity - 1;
          if (1 >= quantity) {
      return;
    }
   dispatch(addItemToCart(id, newQty));

 }
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.id}>
                       <CartItemCard item = {item} deleteCartItems = {deleteCartItems}/>

                    
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
} 

export default Cart