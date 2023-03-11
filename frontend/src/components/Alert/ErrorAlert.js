import React, { Fragment } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const ErrorAlert = (props) => {
  const [open, setOpen] = React.useState(true);
  return (
    <Fragment>
      {props.error ? (
        <Collapse in={open} sx={{ width: "50vmax" , m:"0 auto"}}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            severity="error"
          >
            {props.error}
          </Alert>
        </Collapse>
      ) : null}
    </Fragment>
  );
};

export default ErrorAlert;
