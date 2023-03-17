import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import defaultProfile from "../../images/defaultprofile.png";
import "./UserProfile.css"

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  document.title = `${user.firstName}'s Profile | Daintree`;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login`);
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={user.avatar.url ? user.avatar.url : defaultProfile}
                alt={user.name}
              />
              <p
                onClick={() => navigate(`/profile/update`)}
                style={{ cursor: "pointer" }}
              >
                Edit Profile
              </p>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div>
                <h4>Mobile Number</h4>
                <p>{user.mobileNumber ? user.mobileNumber : null}</p>
              </div>
              <div>
                <h4>Gender</h4>
                <p>{user.gender ? user.gender : null}</p>
              </div>
              <div>
                <p
                  onClick={() => navigate(`/orders/myorders`)}
                  style={{ cursor: "pointer" }}
                >
                  My Orders
                </p>
                <p
                  onClick={() => navigate(`/password/update`)}
                  style={{ cursor: "pointer" }}
                >
                  Change Password
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
