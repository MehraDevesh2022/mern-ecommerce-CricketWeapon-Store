import React from "react";
import "./Home.css";
import ProductCard from "../Products/ProductCard";
import MataData from "../layouts/MataData/MataData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import HeroSlider from "./HeroSilder";
function Home() {
  // we provided all parameter for react-alert at index.js
  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MataData title="Cricket Weapon" />
            <div className="Home_Page">
              <div className="heroSlider_Home">
                <HeroSlider /> 
              </div>
              <h2 className="trending_heading">Trending Products</h2>

              <div className="trending-products">
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
        
              
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}

export default Home;
