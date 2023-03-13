import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PersonIcon from "@mui/icons-material/Person";
// import defaultprofile from "../../images/defaultprofile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "@blaumaus/react-alert";
import Loader from "../Loader/Loader";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  document.title = "Update Profile | Daintree";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [mobileNumber, setMobileNumber] = useState(
    user.mobileNumber ? user.mobileNumber : ""
  );
  const [gender, setGender] = useState(user.gender ? user.gender : "");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const updateProfileForm = new FormData();
    updateProfileForm.set("firstName", firstName);
    updateProfileForm.set("lastName", lastName);
    updateProfileForm.set("email", email);
    updateProfileForm.set("mobileNumber", mobileNumber);
    updateProfileForm.set("gender", gender);
    updateProfileForm.set("avatar", avatar);
    dispatch(updateProfile(updateProfileForm));
  };
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      setTimeout(() => {
        navigate(`/profile`);
      }, 500);
    }
  }, [dispatch, error, isUpdated, navigate, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <PersonIcon />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="updateProfileExtra">
                  <PhoneAndroidIcon />
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
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

export default UpdateProfile;
