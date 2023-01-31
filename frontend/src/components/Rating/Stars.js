import React, { Fragment } from "react";
import Rating from "@mui/material/Rating";
import "./Stars.css";
import { Box, Typography } from "@mui/material";

const Stars = (props) => {
  return (
    <Fragment>
      <Box className="rating" sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Rating
          sx={{
            flexGrow: 0,
            display: { xs: "flex", md: "none" },
            color: "#e26d5c",
          }}
          name="half-rating-read"
          value={props.value}
          precision={0.5}
          readOnly
          size="small"
        />
        <Typography
          className="review-xs"
          sx={{ display: { xs: "block", md: "none" }, fontSize:"1.5vmax"  }}
        >{`(${props.review} Reviews)`}</Typography>
      </Box>
      <Box className="rating" sx={{ display: { xs: "none", md: "flex" } }}>
        <Rating
          name="half-rating-read"
          value={props.value}
          precision={0.5}
          readOnly
          size="medium"
          sx={{
            color: "#e26d5c",
            flexGrow: 0,
            display: { xs: "none", md: "flex" },
          }}
        />
        <Typography
          className="review-md"
          sx={{ display: { xs: "none", md: "flex" } }}
        >{`(${props.review} Reviews)`}</Typography>
      </Box>
    </Fragment>
  );
};

export default Stars;
