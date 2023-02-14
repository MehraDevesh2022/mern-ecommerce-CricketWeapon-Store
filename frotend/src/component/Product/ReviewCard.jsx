import React from 'react'
import profilePng from "../../Image/Profile.png";
import ReactStars from "react-rating-stars-component";


function ReviewCard({review}) {
   console.log(review);
  const firstExample = {
    value: review.rating || 1 ,
    edit: false,
    size: window.innerWidth < 600 ? 18 : 20,
    isHalf: true,
  };

  return (
    <>
      <div className="reviewCard">
        <img src={profilePng} alt="Reviewd user" />
        <p>{review.name}</p>
        <ReactStars {...firstExample} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    </>
  );
}

export default ReviewCard