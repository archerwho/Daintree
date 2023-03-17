import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  const navigate = useNavigate();
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="Product Preview" />
      <div>
        <p onClick={() => navigate(`/product/${item.product}`)}>{item.name}</p>
        <span>{`Price: ₹ ${item.price}`}</span>
        {deleteCartItems && (
          <p onClick={() => deleteCartItems(item.product)}>Remove</p>
        )}
      </div>
    </div>
  );
};

export default CartItemCard;
