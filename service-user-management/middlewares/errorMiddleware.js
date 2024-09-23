const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  return res.status(statusCode).json({
    error_code: statusCode,
    error_message: err.stack,
  });
};

module.exports = errorHandler;
