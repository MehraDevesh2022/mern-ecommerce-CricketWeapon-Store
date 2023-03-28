import React from 'react'
import "./ProcessOrder.css";
import { useSelector , useDispatch } from 'react-redux';
import { updateOrder , clearErrors } from '../../actions/orderAction';
import Sidebar from './Siderbar';
import MetaData from "../layouts/MataData/MataData"
import Loader from "../layouts/loader/Loader"
import { useAlert } from 'react-alert';


function ProcessOrder() {
  return (
    <div>ProcessOrder</div>
  )
}
///deleteUpdateOrder

export default ProcessOrder