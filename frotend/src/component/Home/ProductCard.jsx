import React from 'react'
import { Link } from 'react-router-dom';
import { Rating } from "@material-ui/lab";
function ProductCard({product}) {
    const options = {
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };
  
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src="https://i.ibb.co/DRST11n/1.webp" alt="product image" />
      <p>{product.name}</p>

      <div>
        <Rating {...options} />
        <span className="productCardSpan">({product.numOfReviews})</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
}

export default ProductCard