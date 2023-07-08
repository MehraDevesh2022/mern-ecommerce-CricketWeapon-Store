import React, { useEffect } from "react";
import "./Dashboard.css";
import { BarChart } from "@material-ui/icons";
import Highcharts from "highcharts";
import { ShoppingCart, AssignmentInd, People } from "@material-ui/icons";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productAction";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

Highcharts3D(Highcharts);

const useStyles = makeStyles((theme) => ({
  dashboard: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
    overflow: "hidden",
    margin: 0,
    padding: 0,
  },
  firstBox: {
    width: "20%",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  },

  secondBox: {
    width: "75%",
    height: "fit-content",

    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
  },

  navBar: {
    margin: "0rem",
  },

  summaryCard: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    width: "100%",
    height: "15rem",
    gap: "1rem",

    margin: "1rem 0 0 0",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    margin: "0 1rem ",
    width: "30%",
    height: "10rem",
    backgroundColor: "black",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    transition: "background-color 0.3s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ed1c24",
    },
  },

  textContainer: {
    marginTop: "0.5rem",
    textAlign: "center",
    color: "white",
    textShadow: "1px 1px 2px black",
  },
  heading: {
    fontSize: "20px",
    fontWeight: 800,
    marginBottom: "0.5rem",
    textShadow: "1px 1px 2px black",
  },
  number: {
    fontSize: "1.5rem",
    fontWeight: 500,
    textShadow: "1px 1px 2px black",
  },
  headerConetnt: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    color: "white",
  },

  lineChart: {
    width: "90%",
    height: "fit-content",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    padding: "2rem",
    margin: "-2rem auto 0",
  },

  revenue: {
    width: "100%",
    height: "fit-content",
    display: "flex",
    justifyContent: "center",
  },
  doughnutChart: {
    height: "fit-content",
    width: "40%",
 
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    padding: "1rem",
    margin: "1rem 2rem",
  },

  revnueContainer: {
  
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    margin: "0 1rem ",
    width: "40%",
    height: "10rem",
    padding: "1rem",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    transition: "background-color 0.3s",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
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
      style: {
        fontFamily: "Roboto",
        fontWeight: "900",
      },
    },
    xAxis: {
      categories: ["Initial Amount", "Amount Earned"],
      labels: {
        style: {
          fontWeight: "900",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          fontWeight: "900",
        },
      },
    },
    series: [
      {
        name: "TOTAL AMOUNT",
        data: [0, totalAmmount],
      },
    ],
    plotOptions: {
      line: {
        lineWidth: 4,
        marker: {
          enabled: true,
        },
        color: "black",
      },
    },
  };
  // now set the Value of stock of the product for Doughnut component in  chart .

  const doughnutOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "Product Stock Status",
      align: "center",
      style: {
        color: "black",
        fontWeight: "900",
      },
    },

    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            fontWeight: "500",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Share",
        data: [
          ["Out of Stock", products.length - OutOfStock],

          {
            name: "Out of Stock",
            y: OutOfStock,
            sliced: true,
            selected: true,
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
          <MetaData title="Dashboard - Admin Panel" />
          <div className={classes.dashboard}>
            <div className={classes.firstBox}>
              <Sidebar />
            </div>

            <div className={classes.secondBox}>
              <div className={classes.navBar}>
                <Navbar />
              </div>

              <div className={classes.summaryCard}>
                <div
                  className={classes.cardContainer}
                  style={{
                    backgroundImage: `url("https://assets.leetcode.com/explore/cards/cheatsheets/img-1674082113.png")`,
                    backgroundSize: "cover",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => history.push("/admin/products")}
                >
                  <div className={classes.headerConetnt}>
                    <ShoppingCart
                      fontSize="large"
                      style={{
                        fontSize: "3rem",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                      }}
                    />

                    <Typography variant="h6" className={classes.heading}>
                      Total Products
                    </Typography>
                  </div>
                  <div className={classes.textContainer}>
                    <Typography variant="body2" className={classes.number}>
                      {products && products.length}
                    </Typography>
                  </div>
                </div>

                <div
                  className={classes.cardContainer}
                  style={{
                    backgroundImage: `url("https://assets.leetcode.com/explore/cards/introduction-to-the-beginners-guide/img-1652222288.png")`,
                    backgroundSize: "cover",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => history.push("/admin/orders")}
                >
                  <div className={classes.headerConetnt}>
                    <AssignmentInd
                      fontSize="large"
                      style={{
                        fontSize: "3rem",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                      }}
                    />
                    <Typography variant="h6" className={classes.heading}>
                      Total Orders
                    </Typography>
                  </div>
                  <div className={classes.textContainer}>
                    <Typography variant="body2" className={classes.number}>
                      {orders && orders.length}
                    </Typography>
                  </div>
                </div>

                <div
                  className={classes.cardContainer}
                  style={{
                    backgroundImage: `url("https://assets.leetcode.com/explore/cards/sql-language/img-1657328656.png")`,
                    backgroundSize: "cover",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => history.push("/admin/users")}
                >
                  <div className={classes.headerConetnt}>
                    <People
                      fontSize="large"
                      style={{
                        fontSize: "3rem",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                      }}
                    />
                    <Typography variant="h6" className={classes.heading}>
                      Total Users
                    </Typography>
                  </div>
                  <div className={classes.textContainer}>
                    <Typography variant="body2" className={classes.number}>
                      {users && users.length}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className={classes.lineChart}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={lineOptions}
                />
              </div>

              <div className={classes.revenue}>
                <div className={classes.doughnutChart}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={doughnutOptions}
                  />
                </div>

                <div
                  className={classes.revnueContainer}
                  style={{
                    backgroundImage: `url("https://assets.leetcode.com/explore/cards/cheatsheets/img-1674082113.png")`,
                    backgroundSize: "cover",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    width: "50%",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => history.push("/admin/revenue")}
                >
                  <div className={classes.headerConetnt}>
                    <BarChart
                      fontSize="large"
                      style={{
                        fontSize: "3rem",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                      }}
                    />

                    <Typography variant="h6" className={classes.heading}>
                      Total Revenue
                    </Typography>
                  </div>
                  <div className={classes.textContainer}>
                    <Typography variant="body2" className={classes.number}>
                      {totalAmmount}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
