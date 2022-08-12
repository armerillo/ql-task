
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.message = err.message;
  


  if (process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      success: false,
      error: error.message || "Internal Server Error.",
      stack: err.stack,
    });
  } else {
    res.status(error.statusCode).json({
      success: false,
      error: error.message || "Internal Server Error.",
    });
  }
};
