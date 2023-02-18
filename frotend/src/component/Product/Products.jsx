import React ,{useEffect} from "react";
import "./Products.css";
import {useDispatch , useSelector} from "react-redux"
import Loader from "../layouts/loader/Loader"
import { useAlert } from "react-alert";
import { useRouteMatch } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData"
import { clearErrors , getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard"

function Products(){
const match = useRouteMatch();

let keyword = match.params.keyword;
//    if(!keyword){
//    keyword =" "
//    }
  console.log(keyword);
const dispatch = useDispatch();
const {products , loading ,  productsCount , error} = useSelector(state => state.products)
const alert = useAlert();
console.log(products);

useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }
  dispatch(getProduct(keyword));
}, [dispatch, keyword]);


return (
  <>
   


    {loading ? (
      <Loader />
    ) : (
      <>
        <MetaData title="PRODUCTS --Ecart" />

        <h2 className="productsHeading">Products</h2>
        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </>
    )}
  </>
);

}

export default Products