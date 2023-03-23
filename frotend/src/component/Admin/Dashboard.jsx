import React, { useEffect } from "react";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
<<<<<<< HEAD
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
=======
import { Doughnut, Line } from "react-chartjs-2";
>>>>>>> 4c358b8ad41037d11b800892239a3c37e154ec66
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productAction";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
<<<<<<< HEAD
import Sidebar from "./Siderbar";
import { Link } from "react-router-dom";
=======
import Siderbar from "./Siderbar";
>>>>>>> 4c358b8ad41037d11b800892239a3c37e154ec66

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
<<<<<<< HEAD
  }, [dispatch, error, alert]);

  // chart js values for Line component
  const lineOptions = {
    chart: {
      type: "line",
    },
    xAxis: {
      categories: ["Initial Amount", "Amount Earned"],
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: [
      {
        name: "TOTAL AMOUNT",
        data: [0, 2000],
=======
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
>>>>>>> 4c358b8ad41037d11b800892239a3c37e154ec66
      },
    ],
  };

  // now set the Value of stock of the product for Doughnut component in  chart .
<<<<<<< HEAD
  const doughnutOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Product Stock Status",
    },
    series: [
      {
        name: "Products",
        data: [
          {
            name: "Out of Stock",
            y: 2,
            color: "#00A6B4",
          },
          {
            name: "In Stock",
            y: products.length - OutOfStock,
            color: "#6800B4",
          },
        ],
      },
    ],
=======
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
      },
    ],
    data: [OutOfStock, products.length - OutOfStock], // here OutOfStock we alraedy calculated and available stock will get from product length  - outofstock product
>>>>>>> 4c358b8ad41037d11b800892239a3c37e154ec66
  };

  return (
    <>
<<<<<<< HEAD
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
              <Typography component="h1">Dashboard</Typography>

              <div className="dashboardSummary">
                <div>
                  <p>
                    Total Amount <br /> ₹{2000}
                  </p>
                </div>
                <div className="dashboardSummaryBox2">
                  <Link to="/admin/products">
                    <p>Product</p>
                    <p>{products && products.length}</p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{0}</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>Users</p>
                    <p>{0}</p>
                  </Link>
                </div>
              </div>

              <div className="lineChart">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={lineOptions}
                />
              </div>

              <div className="doughnutChart">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={doughnutOptions}
                />
              </div>
            </div>
          </div>
        </>
      )}
=======
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
>>>>>>> 4c358b8ad41037d11b800892239a3c37e154ec66
    </>
  );
}

export default Dashboard;
<<<<<<< HEAD

            
            

         
=======
>>>>>>> 4c358b8ad41037d11b800892239a3c37e154ec66
