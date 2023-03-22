import React, { useEffect } from "react";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productAction";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import Siderbar from "./Siderbar";

function Dashboard() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const alert = useAlert();
  console.log("render");
  let OutOfStock = 0;
  products &&
    products.forEach((element) => {
      // check how much items out of stocks in products array
      if (element.stock === 0) {
        OutOfStock += 1;
      }
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    console.log(loading);
    dispatch(getAdminProducts());
  }, [dispatch, loading, error, alert]);

  // chart js values for Line component
  const lineState = {
    lables: ["Initial Ammount", "Ammount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT", // it will pop while do hover on char parmeter
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 2000], // 0 will show bottom of chart and totalAmount will show grwoth of errning in chart
      },
    ],
  };

  // now set the Value of stock of the product for Doughnut component in  chart .
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
      },
    ],
    data: [OutOfStock, products.length - OutOfStock], // here OutOfStock we alraedy calculated and available stock will get from product length  - outofstock product
  };

  return (
    <>
      <div className="dashboard">
        {loading ? (
          <Loader />
        ) : (
          <>
            <MetaData title={"Dashboard - Admin Panel"} />
            {/* <Sidebar /> */}
            <div className="dashboardContainer">
              <Typography component="h1">Dashboard</Typography>
              <div className="dashboardSummary"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
