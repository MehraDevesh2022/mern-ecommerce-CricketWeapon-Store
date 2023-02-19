import React ,{useEffect} from "react";
import "./Products.css";
import {useDispatch , useSelector} from "react-redux"
import Loader from "../layouts/loader/Loader"
import { useAlert } from "react-alert";
import { useRouteMatch } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData"
import { clearErrors , getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard"
import Pagination from "react-js-pagination";
function Products(){
const match = useRouteMatch();
let keyword = match.params.keyword;
const dispatch = useDispatch();
const { products, loading, productsCount, error, resultPerPage } = useSelector(
  (state) => state.products
);
const alert = useAlert();


 const [currentPage , setCurrentPage] = React.useState();
 

useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }
  dispatch(getProduct(keyword , currentPage));
}, [dispatch, keyword, currentPage]);


 const setCurrentPageNoHandler =(e) =>{
 // this is inbuild pageHanalder so . this is how does it works
 console.log(e);
 setCurrentPage(e);
 } 


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

        {/* pagination */}
        {resultPerPage < productsCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNoHandler}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="First"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </>
    )}
  </>
);

}

export default Products