import React from "react";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import CardMedia from "@mui/material/CardMedia";
import "./product.css";



const Product = ({ product }) => {
  return (
    <Link href={`/product/${product._id}`} sx={{ textDecoration: "none", cursor: "pointer" }}  >
      <div className="productCard">
        <div>
          <CardMedia
            component="img"
            image={product.images[0].url}
            alt="product-image"
            sx={{ width: "18vmax" }}
          />
        </div>
        <p className="productName">{product.name}</p>
        <p className="description">
          {product.description}
          {"A Regular T shirt with good fabric and much more.asd asd ada sda dasd asd a."
            .slice(0, 10)
            .concat("...")}
        </p>
        <div className="rating">
          <Rating
            name="half-rating-read"
            value={product.averageRating}
            precision={0.5}
            readOnly
            sx={{
              color: "#e26d5c",
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
            }}
          />
          <Rating
            sx={{
              flexGrow: 0,
              display: { xs: "flex", md: "none" },
              color: "#e26d5c",
            }}
            name="half-rating-read"
            value={product.averageRating}
            precision={0.5}
            readOnly
            size="small"
          />
          <span className="review">{product.numberOfReviews}</span>
        </div>
        <span className="productPrice">{`₹ ${product.price}`}</span>
      </div>
    </Link>
  );
};

export default Product;
