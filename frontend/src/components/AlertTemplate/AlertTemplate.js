import React from "react";
import InfoIcon from "./Icons/InfoIcon";
import SuccessIcon from "./Icons/SuccessIcon";
import ErrorIcon from "./Icons/ErrorIcon";
import CloseIcon from "./Icons/CloseIcon";

const alertStyle = {
  backgroundColor: "#CB997E",
  color: "#FFE8D6",
  padding: "10px",
  // textTransform: "uppercase",
  borderRadius: "3px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.03)",
  fontFamily: "Montserrat",
  width: "300px",
  boxSizing: "border-box",
};

const buttonStyle = {
  marginLeft: "20px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: "#CB997E",
};

const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <div style={{ ...alertStyle, ...style }}>
      {options.type === "info" && <InfoIcon />}
      {options.type === "success" && <SuccessIcon />}
      {options.type === "error" && <ErrorIcon />}
      <span style={{ flex: 2 }}>{message}</span>
      <button onClick={close} style={buttonStyle}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default AlertTemplate;
