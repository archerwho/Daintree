const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require(`../middleware/catchAsyncErrors`);
const User = require(`../models/userModel`);
const sendToken = require("../utils/jwtoken");
const sendEmail = require(`../utils/sendEmail`);

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    birthDate,
    password,
    gender,
  } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    birthDate,
    password,
    gender,
    avatar: {
      public_id: `sample ID`,
      url: `sample URL`,
    },
  });

  sendToken(user, 201, res);
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

  sendToken(user, 200, res);
});

// Logging Out
exports.logOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie(`token`, null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: `Logged out`,
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler(`User does not exist.`, 404));
  }
  //getResetToken
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    `host`
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password Reset Token is as follows :- \n\n ${resetPasswordUrl} \n\n If you did not request to reset your password, Ignore this Email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Daintree Password Recovery.`,
      message,
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
