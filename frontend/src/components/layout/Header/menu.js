import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const pages = ["Home", "Products", "About", "Contact"];
const link = ["/", "/products", "/about", "/contact"];

export function MenuBig() {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page, index, arr) => (
        <Button
          key={page}
          sx={{
            my: 2,
            color: "#EDDCD2",
            display: "block",
            fontFamily: "Montserrat",
            fontSize: "1.25rem",
            pt: "10px",
          }}
        >
          {" "}
          <a
            href={link[index]}
            style={{
              textDecoration: "none",
              color: "#EDDCD2",
              fontSize: "1.3rem",
            }}
          >
            {page}
          </a>
        </Button>
      ))}
    </Box>
  );
}
export function MenuMini() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page, index) => (
          <MenuItem
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ fontFamily: "Montserrat" }}
          >
              <a
                href={link[index]}
                style={{
                  textDecoration: "none",
                  color: "#CB997E",
                  fontSize: "0.8rem",
                }}
              >
                {page}
              </a>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
