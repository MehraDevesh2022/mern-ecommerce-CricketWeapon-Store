import React from 'react'
import "./Home.css";
import ProductCard from './ProductCard';
import { CgMouse } from "react-icons/cg";
function Home() {

const product = {
  name: "Blue Tshirt",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "3000",
  _id: "abhishek",
};
    
  return (
    <>
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
        <ProductCard product={product} />
      </div>
    </>
  );
}

export default Home

