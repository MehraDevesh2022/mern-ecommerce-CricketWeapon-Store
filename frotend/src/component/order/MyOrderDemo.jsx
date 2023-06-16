import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";

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
  },
  orderPageTitle: {
    fontSize: "1.5rem",
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
    console.log(orders);
  }, [dispatch, alert, error]);

  return (
    <div>
      <div className={classes.orderPageContainer}>
        <Typography variant="h1" className={classes.orderPageTitle}>
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
  );
};

export default MyOrder;
