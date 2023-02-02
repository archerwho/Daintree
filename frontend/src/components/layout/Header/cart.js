import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "5px 1px 3px 0px",
  },
}));
const Cart = () => {
  return (
    <Box sx={{ flexGrow: 0.07 }}>
      <a href="/cart">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={1} sx={{ color: "#F0EFEB" }}>
            <ShoppingCartCheckoutIcon sx={{ color: "#F0EFEB", fontSize: 30 }} />
          </StyledBadge>
        </IconButton>
      </a>
    </Box>
  );
};

export default Cart;
