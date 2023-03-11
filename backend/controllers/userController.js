const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require(`../middleware/catchAsyncErrors`);
const User = require(`../models/userModel`);
const sendToken = require("../utils/jwtoken");
const sendEmail = require(`../utils/sendEmail`);
const crypto = require(`crypto`);
const cloudinary = require(`cloudinary`);

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, `User Registered.`, res);
});

// Logging In
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorHandler(`Please Enter Email and Password for Logging in.`, 400)
    );
  }

  const user = await User.findOne({ email }).select(`+password`);
  if (!user) {
    return next(new ErrorHandler(`Invalid Email or Password.`, 401));
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    return next(
      new ErrorHandler(`Invalid Email or Password. Please try Again!`, 401)
    );
  }

  sendToken(user, 200, `Log-In Successful.`, res);
});

// Logging Out
exports.logOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie(`token`, null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: `Logged out.`,
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler(`User does not exist.`, 404));
  }
  //getResetToken
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    `host`
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Link to reset your password for Daintree is as follows :- \n\n ${resetPasswordUrl} \n\n If you did not request to reset your password, Ignore this Email and Report to us at ${process.env.SMTP_MAIL}.`;

  try {
    sendEmail({
      email: user.email,
      subject: `Daintree Password Recovery.`,
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  resetPasswordToken = crypto
    .createHash(`sha256`)
    .update(req.params.token)
    .digest(`hex`);

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(`Reset password token Invalid or Expired.`, 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(`Password does not match. Please try again.`, 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, `Password Updated.`, res);
});

// User Profile Details -- Logged In User
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password -- Logged In User
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id }).select(`+password`);

  const isPasswordCorrect = await user.checkPassword(req.body.oldPassword);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler(`Old Password is Incorrect.`, 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(`Password does not match. Please try again.`, 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, `Password Updated.`, res);
});

// Update User Profile-- Logged In User
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    gender: req.body.gender,
  };
  if (req.body.avatar === "undefined") {
    const user = await User.findById(req.user.id);
    newUserDetails.avatar = {
      public_id: user.avatar.public_id,
      url: user.avatar.url,
    };
  } else if (typeof req.body.avatar === "string") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
    new: true,
    runValidators: true,
  });

  sendToken(user, 200, `Profile Updated Successfully.`, res);
});

// Get all Users --Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find({});

  res.status(200).json({
    success: true,
    user,
  });
});

// Get specific User details --Admin
exports.getSpecificUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById({ _id: req.params.id });

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist. Check Id:${req.params.id}.`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Type -- Admin
exports.updateUserType = catchAsyncErrors(async (req, res, next) => {
  const newUserDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    typeOfUser: req.body.typeOfUser,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserDetails, {
    new: true,
    runValidators: true,
  });

  sendToken(user, 200, `Profile Updated.`, res);
});

// Delete User -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist. Check Id:${req.params.id}`, 400)
    );
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: `User Deleted.`,
  });
});
