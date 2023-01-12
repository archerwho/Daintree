const ErrorHandler = require(`../utils/errorhandler`);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || `Internal Sever Error`;

  // wrong ID error (mongoDB)
  if (err.name === `CastError`) {
    const message = `Not a valid Request. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: `statuscode - ${err.statusCode}`, //err.stack,
    message: err.message,
  });
};
