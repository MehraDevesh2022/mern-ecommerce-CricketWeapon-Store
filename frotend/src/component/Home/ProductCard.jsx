import React from 'react'
import StarsRating from "stars-rating";
import { render } from "react-dom";
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
function ProductCard({product}) {
    const firstExample = {
      value: 2.5,
      edit: false,
      size: window.innerWidth < 600 ? 18 : 20,
      isHalf : true
    };
  
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src="https://i.ibb.co/DRST11n/1.webp" alt="product image" />
      <p>{product.name}</p>

      <div>
        <ReactStars {...firstExample} />
        <span className="productCardSpan">({product.numOfReviews})</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
}

export default ProductCard