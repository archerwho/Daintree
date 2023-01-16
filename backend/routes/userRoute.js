const express = require(`express`);
const {
  registerUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSpecificUser,
  updateUserType,
  deleteUser,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authorizedUser,
} = require("../middleware/authentication");

const router = express.Router();

router.route(`/register`).post(registerUser);
router.route(`/password/forgot`).post(forgotPassword);
router.route(`/password/reset/:token`).put(resetPassword);
router.route(`/login`).post(loginUser);
router.route(`/profile`).get(isAuthenticatedUser, getUserProfile);
router.route(`/password/update`).put(isAuthenticatedUser, updatePassword);
router.route(`/profile/update`).put(isAuthenticatedUser, updateProfile);
router.route(`/logout`).get(logOut);
router
  .route(`/admin/users`)
  .get(isAuthenticatedUser, authorizedUser(`admin`), getAllUsers);
router
  .route(`/admin/user/:id`)
  .get(isAuthenticatedUser, authorizedUser(`admin`), getSpecificUser)
  .put(isAuthenticatedUser, authorizedUser(`admin`), updateUserType)
  .delete(isAuthenticatedUser, authorizedUser(`admin`), deleteUser);

module.exports = router;
