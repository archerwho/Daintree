import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import NewAlert from "../Alert/NewAlert";
import Loader from "../Loader/Loader";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

const ForgotPassword = () => {
  document.title = "Forgot Password | Daintree";
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const forgotPasswordForm = new FormData();
    forgotPasswordForm.set("email", email);
    dispatch(forgotPassword(forgotPasswordForm));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
    }
    if (message) {
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <NewAlert error={error} />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="loginEmail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="forgotPasswordBtn"
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

export default ForgotPassword;
