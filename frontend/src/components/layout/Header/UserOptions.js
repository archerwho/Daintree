import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import defaultProfile from "../../../images/defaultprofile.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import "./UserOptions.css";
import { Box } from "@mui/material";
import { useAlert } from "@blaumaus/react-alert";

export function UserOptions(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    { icon: <PersonIcon />, name: "Profile", function: account },
    { icon: <ListAltIcon />, name: "My Orders", function: orders },
    { icon: <ExitToAppIcon />, name: "Logout", function: logoutUser },
  ];
  if (props.user.typeOfUser === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      function: dashboard,
    });
  }

  function dashboard() {
    navigate(`/dashboard`);
  }
  function orders() {
    navigate(`/orders`);
  }
  function account() {
    navigate(`/profile`);
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfull.");
    navigate(`/`);
  }

  return (
    <Box sx={{ flexGrow: 0, height: "46px" }}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={
          <img
            className="speedDialIcon"
            src={props.user.avatar.url ? props.user.avatar.url : defaultProfile}
            alt="profilePic"
          />
        }
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
        className="speedDial"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.function}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
