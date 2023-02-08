import React from "react";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia";
import "./ProductCard.css";
import Stars from "../Rating/Stars";

const ProductCard = ({ product }) => {
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
          {product.description.slice(0, 30).concat("...")}
        </p>
        <Stars stars={product.averageRating} review={product.numberOfReviews} />
        <span className="productPrice">{`₹ ${product.price}`}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
