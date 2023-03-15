import React from "react";
import Rating from "@mui/material/Rating";

const Review = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        font: "500 1.8vmax Montserrat",
        textAlign: "justify",
      }}
    >
      <div>
        <Rating
          name="half-rating-read"
          value={props.stars}
          precision={0.5}
          readOnly
          size="medium"
          sx={{ color: "#cb997e" }}
        />
      </div>
      <div style={{ textJustify: "inter-word" }}>
        <p className="review-md">{props.review}</p>
      </div>
    </div>
  );
};

export default Review;
