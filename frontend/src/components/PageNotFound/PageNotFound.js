import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="PageNotFound">
      <ErrorIcon />
      <p>Page Not Found </p>
      <p onClick={() => navigate(`/`)}>Home</p>
    </div>
  );
};

export default NotFound;
