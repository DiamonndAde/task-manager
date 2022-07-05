const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({
      message: err.message,
      status: err.statusCode,
    });
  }
  return res.status(500).json({ msg: err.message });
};
module.exports = errorHandlerMiddleware;
