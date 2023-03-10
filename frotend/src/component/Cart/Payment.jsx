import React, { useEffect, useState, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps ";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MataData/MataData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import axios from "axios";
import { clearErrors } from "../../actions/productAction";
// for cardDetails for card detials input section and hooks for accessing strip and element from App.js route
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useHistory } from "react-router-dom";

function Payment() {
  // stored at Confirm order Component action
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const history  = useHistory();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userData);

  const paymentData = {
    // stripe takes payment in pese there for multiply with 100 bcz 1rs == 100 pese
    ammount: Math.round(orderInfo.totalFinalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.gst,
    totalPrice: orderInfo.totalFinalPrice,
  };

  async function paymentSubmitHandler(e) {
    e.preventDefault();
    // once button clicked then disable automatically
    payBtn.current.disabled = true;

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
  
      // client_secret is key from STRIPE  while making payement post req at backend
      const client_secret = data.client_secret;

      // passed at App.js route statement
      if (!stripe || !elements) return;

      // this object is from stripe-js. only values need to put
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        // if error then again enable the button on
        payBtn.current.disabled = false;
       
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // add new property inside order object
           order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          alert.success(result.paymentIntent.status);
        history.push("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      // if error while payment then again enable payment button
      payBtn.current.disabled = false;
      console.log(error , "error");
      alert.error(error.response.data.message);
    }
  }

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
  }, [dispatch, alert]);

  return (
    <>
      <>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={paymentSubmitHandler}>
            <Typography>Card Info</Typography>
            <div>
              <CreditCardIcon />
              <CardNumberElement className="paymentInput" />
            </div>

            <div>
              <EventIcon />
              <CardExpiryElement className="paymentInput" />
            </div>

            <div>
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput" />
            </div>
            <button
              ref={payBtn}
              className="paymentFormBtn"
            >{`Pay - ₹${orderInfo && orderInfo.totalFinalPrice}`}</button>
          </form>
        </div>
      </>
    </>
  );
}

export default Payment;
