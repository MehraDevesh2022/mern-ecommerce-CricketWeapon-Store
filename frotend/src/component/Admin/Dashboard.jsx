import React, { useEffect } from "react";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productAction";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import Sidebar from "./Siderbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { orders, error: ordersError } = useSelector(
    (state) => state.allOrders
  );
  const { users, error: usersError } = useSelector((state) => state.allUsers);
  const alert = useAlert();

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
    if (usersError) {
      alert.error(usersError);
      dispatch(clearErrors);
    }
    if (ordersError) {
      alert.error(ordersError);
      dispatch(clearErrors);
    }
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, ordersError, usersError]);

  // total Amount Earned
  let totalAmmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmmount += item.totalPrice;
    });

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
        data: [0, totalAmmount],
      },
    ],
  };

  // now set the Value of stock of the product for Doughnut component in  chart .

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
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
              <Typography component="h1">Dashboard</Typography>

              <div className="dashboardSummary">
                <div>
                  <p>
                    Total Amount <br /> ₹{totalAmmount}
                  </p>
                </div>
                <div className="dashboardSummaryBox2">
                  <Link to="/admin/products">
                    <p>Product</p>
                    <p>{products && products.length}</p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users && users.length}</p>
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
    </>
  );
}

export default Dashboard;