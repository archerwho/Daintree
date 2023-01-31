import React from 'react'
import Typography from "@mui/material/Typography";

export function Logo () {
  return (
    <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Montserrat",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#DDBEA9",
              textDecoration: "none",
            }}
          >
            Daintree
          </Typography>
  )
}

export function LogoMini () {
    return (
        <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 0.75,
              fontFamily: "Montserrat",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#DDBEA9",
              textDecoration: "none",
            }}
          >
            Daintree
          </Typography>
    )
}