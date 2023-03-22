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