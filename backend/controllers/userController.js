const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require(`../middleware/catchAsyncErrors`);
const User = require(`../models/userModel`);
const sendToken = require("../utils/jwtoken");

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
