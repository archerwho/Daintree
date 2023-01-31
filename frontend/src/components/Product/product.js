import React from "react";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia";
import "./product.css";
import Stars from "../Rating/Stars";

const Product = ({ product }) => {
  return (
    <Link
      href={`/product/${product._id}`}
      sx={{ textDecoration: "none", cursor: "pointer" }}
    >
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
        <Stars value={product.averageRating} review={product.numberOfReviews} />
        <span className="productPrice" >{`₹ ${product.price}`}</span>
      </div>
    </Link>
  );
};

export default Product;
