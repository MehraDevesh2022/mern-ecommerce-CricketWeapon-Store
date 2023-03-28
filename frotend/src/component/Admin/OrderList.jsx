import React, { useEffect } from "react";
import "./OrderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, clearErrors  , deleteOrder} from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Siderbar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
function OrderList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const { error, laoding, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateOrder
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      alert.error(deleteError)
      dispatch(clearErrors())
    }
    if(isDeleted){
          alert.success("Order Deleted Successfully");
             history.push("/admin/orders");
             dispatch({ type: DELETE_ORDER_RESET });

    }
    dispatch(getAllOrders());
  }, [dispatch, error, alert , isDeleted , deleteError]);

  // delet order handler
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  };

  // DATA GRID VALUE
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
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
 

  const rows =[];
  orders && orders.forEach(item =>{

    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    });
  })

  return (
    <>
      {laoding ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL ORDERS - Admin`} />
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL ORDERS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrderList;
