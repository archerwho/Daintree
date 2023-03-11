import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "5px 1px 3px 0px",
    
  },
}));
const Cart = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 0.07 }}>
        <IconButton aria-label="cart" onClick={()=>navigate(`/cart`)}>
          <StyledBadge badgeContent={1} sx={{ color: "#F0EFEB" }}>
            <ShoppingCartCheckoutIcon sx={{ color: "#F0EFEB", fontSize: 30 }} />
          </StyledBadge>
        </IconButton>
    </Box>
  );
};

export default Cart;
