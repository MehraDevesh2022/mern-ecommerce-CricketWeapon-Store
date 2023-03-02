import React from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import { CgMouse } from "react-icons/cg";
import MataData from "../layouts/MataData/MataData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
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
            <MataData title="Ecart" />
            <div className="banner">
              <p>Welcome to Ecommerce</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>
              <a href="#container">
                <button>
                  scroll <CgMouse />
                </button>
              </a>
            </div>

            {/* Products */}
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
              {products &&
                products.map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))}
            </div>
          </>
        </>
      )}
    </>
  );
}

export default Home;
