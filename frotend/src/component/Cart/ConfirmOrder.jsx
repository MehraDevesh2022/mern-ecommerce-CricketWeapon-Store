import React from "react";
import CheckoutSteps from "./CheckoutSteps ";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MataData/MataData";
import "./ConfirmOrder.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import Loader from "../layouts/loader/Loader"
function ConfirmOrder() {


  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { user , loading} = useSelector((state) => state.userData);

  const subTotal = cartItems.reduce((acc, currItem) => {
    return acc + currItem.quantity * currItem.price;
  }, 0);

  const shippingCharges = subTotal > 1000 ? 0 : 99;

  const gst = subTotal * 0.18;

  const totalFinalPrice = subTotal + gst + shippingCharges;
  

  const address = `${shippingInfo.address} , ${shippingInfo.city} ${shippingInfo.state} , ${shippingInfo.pinCode} , ${shippingInfo.country}`;

  function proceedToPayment() {
    const data = {
      subTotal,
      shippingCharges,
      gst,
      totalFinalPrice,
    };
    // session storage allowd save data untill  browser tab is opend
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

   
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Confirm Order" />
          <CheckoutSteps activeStep={1} />
          <div className="confirmOrderPage">
            {/* left container  */}
            <div>
              {/* Shoping area container  */}
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmshippingAreaBox">
                  <div>
                    <p>Name:</p>
                    <span>{user.name}</span>
                  </div>

                  <div>
                    <p>Phone:</p>
                    <span>{shippingInfo.phoneNo}</span>
                  </div>

                  <div>
                    <p>Address:</p>
                    <span>{address}</span>
                  </div>
                </div>
              </div>

              {/* confirm cartItem  */}

              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.productId}>
                        <img src={item.image} alt="product" />
                        <Link to={`/product/${item.productId}`}>
                          {" "}
                          {item.name}
                        </Link>
                        <span>
                          {item.quantity} X ₹{item.price}={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Order Summery --> right side */}

            <div>
              <div className="orderSummary">
                <Typography>Order Summery</Typography>

                <div>
                  <div>
                    <p>Subtotal : </p>
                    <span>₹{subTotal}</span>
                  </div>

                  <div>
                    <p>Shipping Charges:</p>
                    <span>₹{shippingCharges}</span>
                  </div>

                  <div>
                    <p>GST :</p>
                    <span>₹{gst}</span>
                  </div>
                </div>
                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>₹{totalFinalPrice}</span>
                </div>
                <button onClick={proceedToPayment}>Proceed To Payment</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ConfirmOrder;
