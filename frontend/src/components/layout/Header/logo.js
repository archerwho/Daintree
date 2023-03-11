import React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();
  return (
    <Typography
      variant="h4"
      noWrap
      component="a"
      onClick={() => navigate(`/`)}
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontFamily: "Montserrat",
        fontWeight: 700,
        letterSpacing: ".1rem",
        color: "#DDBEA9",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      Daintree
    </Typography>
  );
}

export function LogoMini() {
  const navigate = useNavigate();
  return (
    <Typography
      variant="h5"
      noWrap
      component="a"
      onClick={() => navigate(`/`)}
      sx={{
        mr: 2,
        display: { xs: "flex", md: "none" },
        flexGrow: 0.75,
        fontFamily: "Montserrat",
        fontWeight: 700,
        letterSpacing: ".1rem",
        color: "#DDBEA9",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      Daintree
    </Typography>
  );
}
