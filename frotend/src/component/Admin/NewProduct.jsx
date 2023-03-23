import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { clearErrors, addNewProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Siderbar";
import { NEW_PRODUCT_RESET } from "../../constants/productsConstatns";
import { useHistory } from "react-router-dom";

function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


   
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];



  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.createProduct
  );


  useEffect(() =>{
   if(error){
    alert.error(error);
    dispatch(clearErrors());
    
   }
   if (success) {
     alert.success("Product Created Successfully");
     history.push("/admin/dashboard");
     dispatch({ type: NEW_PRODUCT_RESET }); // false to success
   }
    


  } ,[dispatch , alert , success ,history , error])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData tilte="Create Product" />
                  <div className="dashboard">
                    <Sidebar/>
                  </div>

        </>
      )}
    </>
  );
}

export default NewProduct;
