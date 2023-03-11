import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 0.05, height: "46px" }}>
      <p onClick={() => navigate(`/login`)}>
        <IconButton sx={{ p: 0 }}>
          <Avatar
            alt="Profile picture"
            src=""
            sx={{ backgroundColor: "#DDBEA9" }}
          />
        </IconButton>
      </p>
    </Box>
  );
};

export default Profile;
