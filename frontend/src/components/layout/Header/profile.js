import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

const Profile = () => {
  return (
    <Box sx={{ flexGrow: 0.05, height: "46px"}}>
      <a href="/login">
        <IconButton sx={{ p: 0 }}>
          <Avatar
            alt="Profile picture"
            src=""
            sx={{ backgroundColor: "#DDBEA9" }}
          />
        </IconButton>
      </a>
    </Box>
  );
};

export default Profile;
