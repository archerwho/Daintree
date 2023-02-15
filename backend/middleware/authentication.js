const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.cookies)
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler(`Access requires Logging In.`));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizedUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.typeOfUser)) {
      return next(
        new ErrorHandler(
          `${req.user.typeOfUser} does not have access to this path.`,
          403
        )
      );
    }
    next();
  };
};
