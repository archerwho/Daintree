import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTO, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {!loading && isAuthenticated ? (
        isAdmin === true && user && user.typeOfUser !== "admin" ? (
          <Navigate to={"/profile"} />
        ) : (
          children
        )
      ) : (
        <Navigate to={redirectTO} />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
