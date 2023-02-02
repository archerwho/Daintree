import React from "react";
import defaultprofile from "../../images/defaultprofile.png";
import "./ReviewCard.css";
import Review from "../Rating/Review";

const ReviewCard = ({ review }) => {
  return (
    <div className="ReviewCard">
      <img src={defaultprofile} alt="profilepicture" />
      <p>
        {review.firstName} {review.lastName}
      </p>
      <Review value={review.rating} review={review.comment} className="stars"/>
    </div>
  );
};

export default ReviewCard;
