const ErrorHandler = require(`../utils/errorhandler`);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || `Internal Sever Error`;

  // wrong ID error (mongoDB)
  if (err.name === `CastError`) {
    const message = `Not a valid Request. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose Duplicate Error
  if ((err.code === 11000)) {
    const message = `User already exist. Sign-In or try with different Email ID.` //(Duplicate ${Object.keys(err.keyValue)})`;
    err = new ErrorHandler(message, 400);
  }

  // wrong JWT Error
  if (err.name === `JsonWebTokenError`) {
    const message = `Json Web Token is Invalid, try again.`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire Error
  if (err.name === `TokenExpiredError`) {
    const message = `Json Web Token is Expired, try again.`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: `statuscode - ${err.statusCode}`, //${err.stack}
    message: err.message,
  });
};
