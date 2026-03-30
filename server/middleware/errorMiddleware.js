const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  let statusCode = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    const firstValidationError = Object.values(err.errors || {})[0];
    message = firstValidationError?.message || message;
  }

  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
