<<<<<<< HEAD
import React from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab"; // used for down drop menu view as tree form
import PostAddIcon from "@material-ui/icons/PostAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import logo from "../../Image/logo.png";

/** 
   @TreeView ,TreeItem used for Tree view drop down menu .
  */
function Sidebar() {
  return (
    <>
      <div className="sidebar">
        {/* //// Main logo */}
        <Link to="/">
          <img src={logo} alt="Ecart-logo" />
        </Link>
        {/* //// Dashboard icon */}
        <Link to="/admin/dashboard">
          <p>
            <DashboardIcon />
            Dashboard
          </p>
        </Link>
        {/* //// Tree drom dwon menu for new Admin products */}
        <Link>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>

              <Link to="/admin/product">
                <TreeItem
                  nodeId="3"
                  label="Create"
                  icon={<AddIcon />}
                ></TreeItem>
              </Link>
            </TreeItem>
          </TreeView>
        </Link>
        {/* ////orders */}
        <Link to="/admin/orders">
          <p>
            <ListAltIcon />
            Orders
          </p>
        </Link>
        {/* Reviews */}
        <Link to="/admin/reviews">
          <p>
            <RateReviewIcon />
            Reviews
          </p>
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
=======
import React from 'react'
import "./Sidebar.css"
import { useDispatch , useSelector } from 'react-redux'
import { getAdminProducts , clearErrors } from '../../actions/productAction'
import { useAlert } from 'react-alert'

function Siderbar() {
 const dispatch  = useDispatch();
 const {products , loading  , error} = useSelector(state => state.products);
 const alert  = useAlert();
 


  return (
    <div>Siderbar</div>
  )
}

export default Siderbar
>>>>>>> 4c358b8ad41037d11b800892239a3c37e154ec66
