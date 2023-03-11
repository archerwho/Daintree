import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTO }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Fragment>
      {!loading && isAuthenticated ? children : <Navigate to={redirectTO} />}
    </Fragment>
  );
};

export default ProtectedRoute;
