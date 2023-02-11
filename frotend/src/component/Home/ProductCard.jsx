import React from 'react'
import StarsRating from "stars-rating";
import { render } from "react-dom";
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
function ProductCard({product}) {
    const firstExample = {
      size: 30,
      value: 2.5,
      edit: false,
    };
    console.log(product);
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="product image" />
      <p>{product.name}</p>

      <div>
        <ReactStars {...firstExample} />
        <span className="productCardSpan">(256 Reviews)</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
}

export default ProductCard