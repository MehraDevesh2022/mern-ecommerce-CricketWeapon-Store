import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrder,
  clearErrors,
  getOrderDetails,
} from "../../actions/orderAction";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import { Link, useParams } from "react-router-dom";
import OrderDetailsSection from "../Cart/OrderDetails";


const useStyles = makeStyles((theme) => ({
  prodcessOrder: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    width: "97%",
    gap: "1rem",

    overflow: "hidden",
    marginTop: "-1rem",
  },
  firstBox_prodcessOrder: {
    width: "20%",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    marginTop: "-1rem",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    [theme.breakpoints.down("999")]: {
      display: "none",
    },
  },

  toggleBox_prodcessOrder: {
    width: "16rem",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    zIndex: "100",
    position: "absolute",
    top: "58px",
    left: "17px",
  },
  secondBox__prodcessOrder: {
    width: "75%",
    height: "fit-content",
    display: "flex",

    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
    [theme.breakpoints.down("999")]: {
      width: "100%",
    },
  },
  navBar__prodcessOrder: {
    margin: "0rem",
  },

  mainInfo__prodcessOrder: {
    backgroundColor: "white !important",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
    width: "92%",
    margin: "0 auto",
    padding: "0rem 3rem 2rem 3rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0rem 1rem 2rem 1rem",
    },

    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "0rem 0.5rem 2rem 0.5rem",
    },
  },
  order_Details__prodcessOrder: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginLeft: "3rem",
    padding: "2rem 0.5rem 2rem 0.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      padding: "1rem",
      marginLeft: "1rem",
    },

    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: "0 0.5rem",
      marginLeft: "0rem",
    },
  },
  orderSub_heading__prodcessOrder: {
    fontWeight: "600",
    fontSize: "1.5rem",
    marginBottom: "10px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      padding: "0 2rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      padding: "0 1rem",
    },
  },

  boldDivider__prodcessOrder: {
    borderBottom: `0.3px solid #3A3E3A`,
    margin: "0 0 0 3rem",
    width: "52%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "0 0 0 1rem",
    },

    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "0 0 0 0.5rem",
    },
  },
  boldDivider__prodcessOrder2: {
    borderBottom: `0.8px solid #f5f5f5`,
    margin: "0 0 0 3rem",
    width: "52%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "0 0 0 1rem",
    },

    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "0 0 0 0.5rem",
    },
  },

  shipping_Deatils__prodcessOrder: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginLeft: "3rem",
    // padding: "1rem 1px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: "0 2rem",
      marginLeft: "1rem",
    },

    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: "0 1.5rem",
      marginLeft: "0rem",
    },
  },
  shipping_Address__prodcessOrder: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: "0 2rem",
      marginLeft: "1rem",
      marginTop: "-1rem",
    },

    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: "0 1.5rem",
      marginLeft: "0rem",
      marginTop: "-1rem",
    },
  },
  shipping_Address_Details__prodcessOrder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontWeight: "300",
    width: "50%",
    padding: "1rem 0px",
  },
  shipping_heading__prodcessOrder: {
    fontWeight: "800",
    fontSize: "1.5rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },

  total_price__prodcessOrder: {
    display: "flex",
    gap: "18rem",
    marginLeft: "3.1rem",
    marginTop: "-1rem",
    marginBottom: "-1rem",

    [theme.breakpoints.down("sm")]: {
      gap: "10rem",
      marginLeft: "2rem",
    },

    [theme.breakpoints.down("xs")]: {
      gap: "7rem",
      padding: "0rem 1.2rem",
    },
  },
  total_price_span__prodcessOrder: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#414141",
  },
  total_price_p__prodcessOrder: {
    fontSize: "16px",
    fontWeight: 500,
  },
  total_price_h4__prodcessOrder: {
    fontSize: "16px",
    fontWeight: 800,
  },
  greenFont: {
    color: "green",
  },
  redFont: {
    color: "red",
  },
  updateOrderForm__prodcessOrder: {
    backgroundColor: "white",
    marginLeft: "3rem",

    "& > div": {
      display: "flex",
      width: "100%",
      alignItems: "center",
      "& > select": {
        padding: "1vmax 4vmax",
        margin: "2rem 0",
        width: "50%",
        boxSizing: "border-box",
        border: "1px solid rgba(0, 0, 0, 0.267)",
        borderRadius: "4px",
        font: "300 0.9vmax cursive",
        outline: "none",
      },
      "& > svg": {
        position: "absolute",
        transform: "translateX(1vmax)",
        fontSize: "1.6vmax",
        color: "rgba(0, 0, 0, 0.623)",
      },
    },
    [theme.breakpoints.down("799")]: {
      width: "100%",
      padding: "1rem",
      marginLeft: "0rem",
      "& > div > select": {
        padding: "2.5vmax 2.5vmax",
        font: "300 1.7vmax cursive",
      },
      "& > div > svg": {
        fontSize: "2.8vmax",
      },
    },
  },

  placeOrderBtn_prodcessOrder: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "500",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    width: "50%",
    marginBottom: "1rem",
    marginTop: "-1rem",
    "&:hover": {
      backgroundColor: "#00000080",
    },
    [theme.breakpoints.down("799")]: {
      width: "50%",
      padding: "0.5rem 1rem",
      marginLeft: "0rem",
    },
  },

  image: {
    width: "155px",
    height: "140px",
    objectFit: "cover",
    [theme.breakpoints.down(899)]: {
      width: "255px",
      height: "240px",
    },

    [theme.breakpoints.down(599)]: {
      width: "155px",
      height: "140px",
    },
  },
}));

function ProcessOrder() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateOrder
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const classes = useStyles();
  const params = useParams();
  const productId = params.id;


  // for order status
  const [status, setStatus] = useState("");
  const [toggle, setToggle] = useState(false);

  // togle handler =>
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      
      alert.success("Order Updated Successfully");  
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(productId)); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, alert, error, isUpdated, updateError, productId]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);
    dispatch(updateOrder(productId, myForm));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />
          <div className={classes.prodcessOrder}>
            <div
              className={
                !toggle
                  ? `${classes.firstBox_prodcessOrder}`
                  : `${classes.toggleBox_prodcessOrder}`
              }
            >
              <Sidebar />
            </div>

            <div className={classes.secondBox__prodcessOrder}>
              <div className={classes.navBar__prodcessOrder}>
                <Navbar toggleHandler={toggleHandler} />
              </div>
              <div className={classes.mainInfo__prodcessOrder}>
                <div className={classes.order_Details__prodcessOrder}>
                  <h5 className={classes.shipping_heading__prodcessOrder}>
                    USER ORDER DETAILS
                  </h5>
                  {order.orderItems &&
                    order.orderItems.map((item, idx) => (
                      <Link
                        to={`/product/${item.productId}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          textDecorationColor: "none",
                        }}
                      >
                        <OrderDetailsSection
                          key={idx}
                          item={item}
                          totalDiscount={
                            `₹${(item.price * item.quantity * 20) / 100}` // random discount between 1 to 30
                          }
                          totalPrice={`₹${item.price * item.quantity}`}
                        />
                      </Link>
                    ))}
                </div>

                <div className={classes.shipping_Deatils__prodcessOrder}>
                  <Typography
                    variant="h6"
                    className={classes.orderSub_heading__prodcessOrder}
                  >
                    DELIVERY ADDRESS
                  </Typography>

                  <div className={classes.shipping_Address__prodcessOrder}>
                    <div
                      className={
                        classes.shipping_Address_Details__prodcessOrder
                      }
                    >
                      <Typography
                        variant="subtitle2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        {order.user && order.user.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        className={classes.mobileNo__prodcessOrder}
                        style={{
                          fontWeight: 400,
                          marginTop: "-5px",
                          fontSize: "16px",
                        }}
                      >
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        className={classes.emailAddress__prodcessOrder}
                        style={{
                          fontWeight: 400,
                          fontSize: "16px",
                        }}
                      >
                        {order.user && order.user.email}
                      </Typography>
                    </div>
                  </div>
                </div>

                <Divider className={classes.boldDivider__prodcessOrder} />
                <div
                  className={`${classes.total_price__prodcessOrder} ${classes.order_Summary_Item__prodcessOrder}`}
                >
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
                    <b style={{ marginLeft: "-2rem" }}>
                      ₹{order.totalPrice && order.totalPrice}
                    </b>
                  </p>
                </div>

                <div
                  className={`${classes.total_price__prodcessOrder} ${classes.order_Summary_Item__prodcessOrder}`}
                >
                  <div>
                    <h4>Order Status</h4>
                  </div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b> {order.orderStatus && order.orderStatus}</b>
                  </p>
                </div>

                <div
                  className={`${classes.total_price__prodcessOrder} ${classes.order_Summary_Item__prodcessOrder}`}
                >
                  <div>
                    <h4>Payment Status</h4>
                  </div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? `${classes.greenFont}`
                        : `${classes.redFont}`
                    }
                  >
                    <b className={classes.greenFont}>
                      {" "}
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </b>
                  </p>
                </div>

                {order.orderStatus && (
                  <>
                    <div
                      style={{
                        display:
                          order.orderStatus === "Delivered" ? "none" : "block",
                        padding: " 0 1rem 0 0",
                      }}
                    >
                      <Divider
                        className={classes.boldDivider__prodcessOrder2}
                      />
                      <form className={classes.updateOrderForm__prodcessOrder}>
                        <h1>Process Order</h1>

                        <div style={{ marginTop: "-1rem" }}>
                          <AccountTreeIcon />
                          <select onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Choose Category</option>
                            {order.orderStatus === "Processing" && (
                              <option value="Shipped">Shipped</option>
                            )}

                            {order.orderStatus === "Shipped" && (
                              <option value="Delivered">Delivered</option>
                            )}
                          </select>
                        </div>

                        <Button
                          variant="contained"
                          className={classes.placeOrderBtn_prodcessOrder}
                          fullWidth
                          onClick={updateOrderSubmitHandler}
                          disabled={
                            loading
                              ? true
                              : false || status === ""
                              ? true
                              : false
                          }
                        >
                          Process
                        </Button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProcessOrder;
