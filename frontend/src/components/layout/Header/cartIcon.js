import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "3px",
  },
}));
const CartIcon = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Box sx={{ flexGrow: 0.07 }}>
      <IconButton aria-label="cart" onClick={() => navigate(`/cart`)}>
        <StyledBadge badgeContent={cartItems.length} sx={{ color: "#F0EFEB" }}>
          {cartItems.length > 0 ? (
            <ShoppingCartCheckoutIcon sx={{ color: "#F0EFEB", fontSize: 30 }} />
          ) : (
            <AddShoppingCartIcon sx={{ color: "#F0EFEB", fontSize: 30 }} />
          )}
        </StyledBadge>
      </IconButton>
    </Box>
  );
};

export default CartIcon;
