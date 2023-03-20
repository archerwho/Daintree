import React from "react";
import defaultprofile from "../../images/defaultprofile.png";
import "./ReviewCard.css";
import Review from "../Rating/Review";
// import { useSelector } from "react-redux";

const ReviewCard = ({ review }) => {
  // const { user } = useSelector((state) => state.user);
  return (
    <div className="ReviewCard">
      <img
        src={review.userImage ? review.userImage.url : defaultprofile}
        alt="profilepicture"
      />
      <p>
        {review.firstName} {review.lastName}
      </p>
      <Review stars={review.rating} review={review.comment} className="stars" />
    </div>
  );
};

export default ReviewCard;
