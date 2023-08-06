import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert"; 

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { DELETE_PRODUCT_RESET } from "../../constants/productsConstatns";

function ProductList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  const { error, products, loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateProduct
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
    
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, deleteError, history, isDeleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

const columns = [
  {
    field: "id",
    headerName: "Product ID",
    minWidth: 230,
    flex: 0.5,
    headerClassName: "column-header",
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
    flex: 0.5,
    magin: "0 auto",
    headerClassName: "column-header hide-on-mobile",
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    minWidth: 100,
    flex: 0.5,
    headerClassName: "column-header hide-on-mobile",
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    minWidth: 200,
    flex: 0.5,
    headerClassName: "column-header hide-on-mobile",
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    sortable: false,
    minWidth: 230,
    headerClassName: "column-header1",
    renderCell: (params) => {
      return (
        <>
          <Link
            to={`/admin/product/${params.getValue(params.id, "id")}`}
            style={{ marginLeft: "1rem" }}
          >
            <EditIcon className="icon-" />
          </Link>

          <div
            onClick={() =>
              deleteProductHandler(params.getValue(params.id, "id"))
            }
          >
            <DeleteIcon className="iconbtn" />
          </div>
        </>
      );
    },
  },
];


  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  // togle handler =>
  const toggleHandler = () => {

    setToggle(!toggle);
  };

  // to close the sidebar when the screen size is greater than 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      

      }
    };
       
          
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL PRODUCTS - Admin`} />

          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <h4 id="productListHeading">ALL PRODUCTS</h4>

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
          </div>
        </>
      )}
    </>
  );
}

export default ProductList;
