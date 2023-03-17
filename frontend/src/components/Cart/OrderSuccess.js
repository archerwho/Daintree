import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate()
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully </Typography>
      <p onClick={() => navigate("/orders/myorders")}>View Orders</p>
    </div>
  );
};

export default OrderSuccess;
