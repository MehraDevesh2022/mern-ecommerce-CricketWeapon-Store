import React from 'react'
import profilePng from "../../Image/Profile.png";
import { Rating } from "@material-ui/lab";


function ReviewCard({ review, ratings }) {
  const options = {
    size: "large",
    value: ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className="reviewCard">
        <img src={profilePng} alt="Reviewd user" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    </>
  );
}

export default ReviewCard