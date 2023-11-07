import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MataData/MataData";
import { useAlert } from "react-alert";
import axios from "axios";
import { useHistory } from "react-router-dom";
import OrderDetailsSection from "./OrderDetails";
import DummyCard from "./DummyCard";
import { clearErrors, createOrder } from "../../actions/orderAction";
import CheckoutSteps from "./CheckoutSteps ";

// for cardDetails for card detials input section and hooks for accessing strip and element from App.js route
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Cart.css";
import {
  Typography,
  TextField,
  Grid,
  Radio,
  Button,
  Divider,
  Link,
} from "@material-ui/core";
import {
  CreditCard,
  CardMembership,
  Payment,
  Lock,

} from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import { ReactComponent as MasterCard } from "../../Image/payment-svg/mastercard.svg";
import { ReactComponent as Visa } from "../../Image/payment-svg/visa (1).svg";
import { ReactComponent as Paytm } from "../../Image/payment-svg/paytm.svg";
import {
  dispalyMoney,
  generateDiscountedPrice,
} from "../DisplayMoney/DisplayMoney";

const useStyles = makeStyles((theme) => ({
  payemntPage: {
    padding: "1rem 0",
    width: "100%",
    backgroundColor: "white",
    overFlow : "hidden",
  },

  paymentPage__container: {
    display: "flex",
    width: "100%",
    boxSize: "border-box",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "center",
    },
  },

  PaymentBox: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    paddingLeftLeft: "0.5rem",
    overFlow: "hidden",
    backgroundColor: "white",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginTop: "1rem",
      padding: "2rem",
    },
  },
  PaymentHeading: {
    fontWeight: "800",
    marginBottom: "1rem",
    fontSize: "1.5rem",
    textTransform: "uppercase",
  },
  securePayemnt: {
    display: "flex",
    alignItems: "center",
    fontWeight: "300",
    backgroundColor: "#f5f5f5 !important",
    width: "90%",
    padding: "1rem",
    gap: "0.8rem",
    marginBottom: "1rem",
    "& svg": {
      fontSize: "2rem",
    },
  },
  icons: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    width: "100%",
    "& svg": {
      fontSize: "1.8rem",
      cursor: "pointer",
    },
  },
  cardContainer: {
    padding: "1rem",
    border: "1px solid #f5f5f5",
    borderRadius: "0.5rem",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
    width: "90%",
  },
  subHeading: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: "500",
    marginBottom: "1rem",
    "& svg": {
      fontSize: "1.5rem",
    },
  },
  cardDetails: {
    width: "100%%",
    "& .MuiGrid-item": {
      marginBottom: "0.5rem",
    },
  },
  labelText: {
    fontWeight: "300",
  },
  outlinedInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000",
        borderRadius: "none !important",
      },
      "&:hover fieldset": {
        borderColor: "#000",
        "&.Mui-focused fieldset": {
          borderColor: "#000",
        },
      },
    },
  },
  cardSelection: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
    "& svg": {
      fontSize: "1.5rem",
      cursor: "pointer",
      color: "#00000080",
    },
  },

  radioText: {
    fontWeight: "400",
    fontSize: "1rem",
    color: "#00000080",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  },
  radio: {
    color: "#000",
    "&.Mui-checked": {
      color: "#000",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
  },
  placeOrderBtn: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "500",
    fontSize: "1rem",
    padding: "0.8rem 1rem",
    borderRadius: "0.5rem",
    width: "90%",
    marginLeft: "1rem",
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: "#00000080",
    },
  },
  termsAndConditionsText: {
    fontFamily: "Roboto",
    color: "#727272",
    fontWeight: "400",
    lineHeight: "17px",
    paddingLeft: "16px",
    fontSize: "12px",
  },
  privacyText: {
    marginLeft: "4px",
    textDecoration: "underline",
    color: "black",
    fontSize: "14px",
    "&:hover": {
      color: "red",
    },
  },
  paymentInput: {
    width: "95%",
    padding: "18.5px 14px",
    border: "1px solid #000",
  },
  paymentInput2: {
    width: "90%",
    padding: "18.5px 14px",
    border: "1px solid #000",
  },
  cardNumberInput: {
    position: "relative",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000",
        borderRadius: "none !important",
      },
      "&:hover fieldset": {
        borderColor: "#000",
        "&.Mui-focused fieldset": {
          borderColor: "#000",
        },
      },
    },
  },
  expiryInput: {
    position: "relative",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000",
        borderRadius: "none !important",
      },
      "&:hover fieldset": {
        borderColor: "#000",
        "&.Mui-focused fieldset": {
          borderColor: "#000",
        },
      },
    },
  },
  cvvInput: {
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    top: "50%",
    right: "1rem",
    transform: "translateY(-50%)",
    color: "#00000080",
    cursor: "pointer",
  },

  payemntAmount: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    height: "fit-content",
    padding: "1rem 0.5rem 0 0.5rem",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: "2rem",
    },
  },
  order_Details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "2rem 0.5rem 2rem 0.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: "2rem",
    },
  },
  orderSub_heading: {
    fontWeight: "600",
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  boldDivider: {
    borderBottom: `0.3px solid #3A3E3A`,
    margin: "5px 0",
    width: "99%",
  },
  shipping_Deatils: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    padding: "1rem 1px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: "1rem 2rem",
    },
  },
  shipping_Address: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  shipping_Address_Details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontWeight: "300",
    padding: "10px 0px",
    width: "70%",
  },
  shipping_Address_edit: {
    paddingRigth: "1rem",
    "& svg": {
      fontSize: "1.8rem",
      cursor: "pointer",
      color: "black",
      "&:hover": {
        color: "#ed1c24",
      },
    },
  },
 
}));

const PaymentComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user, loading } = useSelector((state) => state.userData);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { error } = useSelector((state) => state.newOrder);
  const [isFocused, setIsFocused] = useState(false);
  const [nameOnCard, setNameOnCard] = React.useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isValid, setIsValid] = useState(true);
    const [showDummyCard, setShowDummyCard] = useState(false);


  const subTotal = cartItems.reduce((acc, currItem) => {
    return acc + currItem.quantity * currItem.price;
  }, 0);

  const totalFinalPrice = subTotal;

  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value);
  };

  const handleApplyCoupon = () => {
    // handle apply coupon logic
    setIsValid(false);
  };

  const handleFocus = (event) => {
    setIsFocused(event.target.value !== "");
  };


  
    const handleRadioChange = () => {
      setShowDummyCard(!showDummyCard);
    };

    const handleCloseDummyCard = () => {
      setShowDummyCard(false);
    };


  const address = `${shippingInfo.address} , ${shippingInfo.city} ${
    shippingInfo.state
  } , ${shippingInfo.pinCode} , ${shippingInfo.country || "India"}`;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subTotal,
    shippingPrice: 0,
    totalPrice: totalFinalPrice,
  };

  const paymentData = {
    // stripe takes payment in pese there for multiply with 100 bcz 1rs == 100 pese
    amount: Math.round(totalFinalPrice * 100),
  };

  async function paymentSubmitHandler(e) {
    e.preventDefault();
    if(nameOnCard === ""){
      alert.error("Please enter name on card");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
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
              country: "IN",
            },
          },
        },
      });

      if (result.error) {
        // if error then again enable the button on

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // add new property inside order object
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          alert.success(result.paymentIntent.status);

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      // if error while payment then again enable payment button

    
      alert.error(error.message);
    }
  }
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, error]);

  // claculte price after discount
  let totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );



  let discountedPrice = generateDiscountedPrice(totalPrice);
  let totalDiscount = totalPrice - discountedPrice;
  let final = totalPrice - totalDiscount;
  final = dispalyMoney(final);
  totalDiscount = dispalyMoney(totalDiscount); 
  totalPrice = dispalyMoney(totalPrice);

  return (
    <>
 
        <div className={classes.payemntPage}>
          <CheckoutSteps activeStep={2} />
          <MetaData title={"Payment"} />
          <div className={classes.paymentPage__container}>
            <div className={classes.PaymentBox}>
              <Typography
                variant="h5"
                component="h1"
                className={classes.PaymentHeading}
              >
                Payment method
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                className={classes.securePayemnt}
              >
                <AssuredWorkloadOutlinedIcon />
                Payments are SSL encrypted so that your credit card and payment
                details stay safe.
              </Typography>

              <div className={classes.cardContainer}>
                <Typography variant="h6" className={classes.subHeading}>
                  Credit Card <CreditCard fontSize="medium" />
                </Typography>
                <Grid container spacing={2} className={classes.cardDetails}>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      className={classes.labelText}
                    >
                      Card number
                    </Typography>
                    <div className={classes.cardNumberInput}>
                      <CardMembership className={classes.inputIcon} />
                      <CardNumberElement className={classes.paymentInput} />
                    </div>
                  </Grid>
                  <Grid item xs={12} container justifyContent="space-between">
                    <Grid item className={classes.icons}>
                      <MasterCard
                        style={{
                          width: "5%",
                          height: "auto",
                        }}
                      />
                      <Visa
                        style={{
                          width: "5%",
                          height: "auto",
                        }}
                      />
                      <Paytm
                        style={{
                          width: "5%",
                          height: "auto",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      className={classes.labelText}
                    >
                      EXPIRY DATE
                    </Typography>
                    <div className={classes.expiryInput}>
                      <Payment className={classes.inputIcon} />
                      <CardExpiryElement className={classes.paymentInput2} />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      className={classes.labelText}
                    >
                      CVV/CVV
                    </Typography>
                    <div className={classes.cvvInput}>
                      <Lock className={classes.inputIcon} />
                      <CardCvcElement className={classes.paymentInput2} />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      className={classes.labelText}
                    >
                      NAME ON CARD
                    </Typography>
                    <TextField
                      placeholder="John Doe"
                      variant="outlined"
                      fullWidth
                      className={classes.outlinedInput}
                      value={nameOnCard}
                      required
                      onChange={handleNameOnCardChange}
                    />
                  </Grid>
                </Grid>
              </div>

              <div className={classes.cardSelection}>
                <Radio
                  value="dummyCard"
                  className={classes.radio}
                  checked={showDummyCard}
                  onChange={handleRadioChange}
                />
                <Typography variant="subtitle2" className={classes.radioText}>
                  Use dummy card
                </Typography>
                <CreditCard fontSize="medium" />
                {showDummyCard && <DummyCard onClose={handleCloseDummyCard} />}
              </div>
              <Typography
                variant="body2"
                className={classes.termsAndConditionsText}
              >
                By clicking "Place Order", you agree to our
                <Link href="#" className={classes.privacyText}>
                  Cricket Weapon Terms & Conditions
                </Link>
              </Typography>
              <Button
                variant="contained"
                className={classes.placeOrderBtn}
                fullWidth
                // disabled={isDisable}
                style={{ marginTop: "3rem" }}
                onClick={paymentSubmitHandler}
              >
                Place Order
              </Button>
            </div>
            <div className={classes.payemntAmount}>
              <div className="order_summary">
                <h4>
                  Order Summary &nbsp; ( {cartItems.length}{" "}
                  {cartItems.length > 1 ? "items" : "item"} )
                </h4>
                <div className="order_summary_details">
                  <div className="price order_Summary_Item">
                    <span>Original Price</span>
                    {/* ORIGINAL PRICE TOATAL */}
                    <p>{totalPrice}</p>
                  </div>

                  <div className="discount order_Summary_Item">
                    <span>Discount</span>
                    <p>
                      <del>{totalDiscount}</del>
                    </p>
                  </div>

                  <div className="delivery order_Summary_Item">
                    <span>Delivery</span>
                    <p>
                      <b>Free</b>
                    </p>
                  </div>

                  <div className="separator_cart"></div>
                  <div className="total_price order_Summary_Item">
                    <div>
                      <h4>Total Price</h4>

                      <p
                        style={{
                          fontSize: "14px",
                          marginTop: "-10px",
                          color: "#414141",
                        }}
                      >
                        (Inclusive of all taxes)
                      </p>
                    </div>
                    <p>
                      <b>{final}</b>
                    </p>
                  </div>
                </div>
              </div>

              <div className="separator"></div>

              <div className="coupon-box-wrapper">
                <div
                  className={`coupon-box-content ${isFocused ? "focused" : ""}`}
                >
                  <TextField
                    label="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={() => setIsFocused(false)}
                    error={!isValid}
                    helperText={!isValid && "Invalid coupon code"}
                    variant="outlined"
                    size="small"
                    style={{
                      width: "200px",
                      marginRight: "1rem",
                    }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    className="coupon-box-apply-btn"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <div className="paymentLogoImg">
                <img
                  src={require("../../Image/cart/cart_img.png")}
                  alt="payemnt-icons"
                  className="paymentImg"
                />
              </div>
              <div className={classes.order_Details}>
                <h5 className={classes.orderSub_heading}>ORDER DETAILS</h5>
                {cartItems &&
                  cartItems.map((item, idx) => (
                    <Link to={`/product/${item.productId}`} style ={{textDecoration : "none" , color : "inherit"}}>
                      <OrderDetailsSection
                        key={idx}
                        item={item}
                        totalDiscount={totalDiscount}
                        totalPrice={totalPrice}
                      />
                    </Link>
                  ))}
              </div>
              <Divider className={classes.boldDivider} />
              <div className={classes.shipping_Deatils}>
                <Typography variant="h6" className={classes.orderSub_heading}>
                  DELIVERY ADDRESS
                </Typography>

                <div className={classes.shipping_Address}>
                  <div className={classes.shipping_Address_Details}>
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px", fontWeight: 400 }}
                    >
                      {user.name && user.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px", fontWeight: 400 }}
                    >
                      {address}
                    </Typography>
                  </div>
                  <div className={classes.shipping_Address_edit}>
                    <EditIcon
                      className={classes.editIcon}
                      onClick={() => {
                        history.push("/shipping");
                      }}
                    />
                  </div>
                </div>
                <Typography
                  variant="subtitle2"
                  className={classes.mobileNo}
                  style={{
                    fontWeight: 400,
                    marginTop: "-5px",
                    fontSize: "16px",
                  }}
                >
                  {shippingInfo.phoneNo},
                </Typography>

                <Typography
                  variant="subtitle2"
                  className={classes.emailAddress}
                  style={{ fontWeight: 400, fontSize: "16px" }}
                >
                  {user.email}
                </Typography>
              </div>

              <div className={classes.shipping_Deatils}>
                <Typography
                  variant="h6"
                  className={classes.orderSub_heading}
                  style={{ marginTop: "5px" }}
                >
                  BILLING DETAILS
                </Typography>

                <div className={classes.shipping_Address}>
                  <div className={classes.shipping_Address_Details}>
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px", fontWeight: 400 }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px", fontWeight: 400 }}
                    >
                      {address}
                    </Typography>
                  </div>
                  <div className={classes.shipping_Address_edit}>
                    <EditIcon
                      className={classes.editIcon}
                      onClick={() => {
                        history.push("/shipping");
                      }}
                    />
                  </div>
                </div>
                <Typography
                  variant="subtitle2"
                  className={classes.mobileNo}
                  style={{
                    fontWeight: 400,
                    marginTop: "-5px",
                    fontSize: "16px",
                  }}
                >
                  {shippingInfo.phoneNo},
                </Typography>

                <Typography
                  variant="subtitle2"
                  className={classes.emailAddress}
                  style={{ fontWeight: 400, fontSize: "16px" }}
                >
                  {user.email}
                </Typography>
              </div>
            </div>
          </div>
        </div>
    
    </>
  );
};

export default PaymentComponent;
