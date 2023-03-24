import React from "react";
import CardMedia from "@mui/material/CardMedia";
import "./ProductCard.css";
import Stars from "../Rating/Stars";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  return (
      <div onClick={()=>navigate(`/product/${product._id}`)} className="productCard">
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
  );
};

export default ProductCard;
