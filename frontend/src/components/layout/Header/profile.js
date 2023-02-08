import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const settings = ["Profile", "Your Orders", "Dashboard", "Logout"];
const link = ["/profile", "/yourorders", "/dashboard", "/"]

const Profile = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0.05, height: "46px" }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar
          alt="Profile picture"
          src=""
          sx={{ backgroundColor: "#DDBEA9" }}
        />
      </IconButton>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, index) => (
          <MenuItem
            key={setting}
            onClick={handleCloseUserMenu}
            sx={{ fontFamily: "Montserrat" }}
          >
            <Typography textAlign="center"><a
                href={link[index]}
                style={{
                  textDecoration: "none",
                  color: "#CB997E",
                  fontSize: "0.8rem",
                  fontFamily: "Montserrat"
                }}
              >
                {setting}
              </a></Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Profile;
