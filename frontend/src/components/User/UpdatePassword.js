import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import NewAlert from "../Alert/NewAlert";
import Loader from "../Loader/Loader";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {
  document.title = "Update Password | Daintree";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const updatePasswordForm = new FormData();
    updatePasswordForm.set("oldPassword", oldPassword);
    updatePasswordForm.set("newPassword", newPassword);
    updatePasswordForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(updatePasswordForm));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
    }
    if (isUpdated) {
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      setTimeout(() => {
        navigate(`/profile`);
      }, 500);
    }
  }, [dispatch, error, isUpdated, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <NewAlert error={error} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    autoComplete="false"
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="false"
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="false"
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updatePasswordBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
