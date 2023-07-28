import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderAction";
import MetaData from "../layouts/MataData/MataData";
import CricketBallLoader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import OrderCard from "./OrderCard";

const useStyles = makeStyles((theme) => ({
  orderPageContainer: {
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    marginBottom: "1rem",
   flexDirection: "column",
   alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "7rem",
   
  },
  orderPageTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  orderPageText: {
    color: "#6c757d",
    marginTop: "1rem",
  },
}));

const MyOrder = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { orders, loading, error } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.userData);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div>
          <MetaData title="My Orders" />
          <div className={classes.orderPageContainer}>
            <Typography variant="h6" className={classes.orderPageTitle}>
              Your Order
            </Typography>
            <Typography variant="body1" className={classes.orderPageText}>
              {orders.length} order placed in {currentYear}
            </Typography>
          </div>

          {orders.map((item) => (
            <div className={classes.orderCard} key={item._id}>
              <OrderCard item={item} user={user} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyOrder;
