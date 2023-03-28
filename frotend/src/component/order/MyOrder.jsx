import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

import "./Myorder.css";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layouts/MataData/MataData";
import LaunchIcon from "@material-ui/icons/Launch";
import { Link } from "react-router-dom";
import Loader from "../layouts/loader/Loader";


function MyOrder() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.userData);

  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    console.log("render");
    dispatch(myOrders());
    console.log(orders);
  }, [dispatch, alert, error]);

  //   this is for DataGrid component from matrial ui .here filed is like identifier {just like name in input tag} and headerName is for heading
  //    const columns = [
  //      {
  //        field: "id",
  //        headerName: "Order ID",
  //        minWidth: 300,
  //        flex: 1,
  //      },

  //      {
  //        field: "status",
  //        headerName: "Status",
  //        minWidth: 150,
  //        flex: 0.5,
  //        // setting class if status Delivered then green else redColor (define in App.css)  params.getValue(params.id , status) will get id of oreder added at row array . and will cheack status of order using id if deliverd then green else red

  //        cellClassName: (params) => {
  //          return params.getValue(params.id, "status") === "Delivered"
  //            ? "greenColor"
  //            : "redColor";
  //        },
  //      },

  //      {
  //        field: "itemsQty",
  //        headerName: "Items Qty",
  //        type: "number",
  //        minWidth: 150,
  //        flex: 0.3,
  //      },
  //      {
  //        field: "amount",
  //        headerName: "Amount",
  //        type: "number",
  //        minWidth: 270,
  //        flex: 0.5,
  //      },

  //      {
  //        field: "actions",
  //        flex: 0.3,
  //        headerName: "Actions",
  //        minWidth: 150,
  //        type: "number",
  //        sortable: false,
  //        renderCell: (params) => {
  //          return (
  //            <Link
  //              to={`/order/${params.getValue(params.id, "id")}`} // this will take id of order from row and add link of oredr details page
  //            >
  //              <LaunchIcon />
  //            </Link>
  //          );
  //        },
  //      },
  //    ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  // this also for DataGrid
  const rows = []; // value will add manually using forEach in orders array

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length, // targeting all fileds of colom
        amount: item.totalPrice,
      });
    });

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <div>Hello orders</div> */}
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        </>
      )}
    </>
  );
}

export default MyOrder;
