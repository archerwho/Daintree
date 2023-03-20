import React from "react";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "@blaumaus/react-alert";
import { logout } from "../../actions/userAction";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfull.");
    navigate(`/`);
  }

  return (
    <div className="sidebar">
      <div className="top">
        <span onClick={() => navigate(`/`)} className="logo">
          Daintree
        </span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() => navigate(`/admin/dashboard`)}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <li onClick={() => navigate(`/admin/users`)}>
            <PersonOutlineIcon className="icon" />
            <span>Users</span>
          </li>
          <li onClick={() => navigate(`/admin/products`)}>
            <StoreIcon className="icon" />
            <span>Products</span>
          </li>
          <li onClick={() => navigate(`/admin/orders`)}>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li onClick={() => navigate("/admin/reviews")}>
            <RateReviewIcon className="icon" />
            <span>Reviews</span>
          </li>
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          <p className="title">ACTIONS</p>
          <li onClick={() => navigate(`/admin/product`)}>
            <InsertChartIcon className="icon" />
            <span>Add a Product</span>
          </li>
          {/* <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          {/* <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USER</p>
          <li onClick={() => navigate(`/profile`)}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={logoutUser}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
