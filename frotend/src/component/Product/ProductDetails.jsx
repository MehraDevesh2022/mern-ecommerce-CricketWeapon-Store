import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import ReviewCard from "./ReviewCard";
import { useRouteMatch } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import { addItemToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productsConstatns";

function ProductDetails() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const alert = useAlert();

  // states =>
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // get product from  productDetails
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  // get review from addNewReview
  //  changing error name to reviewError because error also using from productDetails state .

  const { success, error: reviewError } = useSelector((state) => {
    return state.addNewReview;
  });

  // options for Rating of matrial ui component
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, error, alert, success, reviewError]);

  function increaseQuantityHandler() {
    if (product.Stock <= quantity) {
      return;
    }

    setQuantity((prv) => prv + 1);
  }

  function deceraseQuantityHandler() {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prv) => prv - 1);
  }

  const addToCartHandler = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  // Dialog box handler for comment
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  // review handler
  function reviewSubmitHandler() {
    const myForm = new FormData();
    myForm.set("ratings", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} --Ecart`} />
          <div className="ProductDetails">
            <div className="CarouselImage ">
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={deceraseQuantityHandler}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantityHandler}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                precision={0.5}
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ resize: "none" }}
              ></textarea>
            </DialogContent>

            <DialogActions>
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                onClick={submitReviewToggle}
              >
                Cancel
              </Button>
              <Button
                onClick={reviewSubmitHandler}
                variant="contained"
                size="medium"
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {/* REVIEWS section */}
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    ratings={review.ratings}
                  />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
}

export default ProductDetails;
