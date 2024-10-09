const errorHandler = (err, req, res, next) => {
  console.log(err);
  
  let statusCode = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
    case "SequelizeForeignKeyConstraintError":
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      message = "Invalid token";
      break;
    case "Email is required":
      statusCode = 400;
      message = "Email is required";
      break;
    case "Password is required":
      statusCode = 400;
      message = "Password is required";
      break;
    case "Invalid email or password":
      statusCode = 401;
      message = "Invalid Email or Password";
      break;
    case "Unauthorized":
      statusCode = 401;
      message = "Unauthorized";
      break;
    case "Forbidden":
      statusCode = 403;
      message = "Forbidden";
      break;
    case "NotFound":
      statusCode = 404;
      message = "Not Found";
      break;
    default:
      break;
  }
  res.status(statusCode).json({ message });
};

module.exports = errorHandler;