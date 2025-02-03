import Axios from 'axios';

export const cors = (options = {}) => {
  return (req, res, next) => {
    if (req.method.toLowerCase() === 'options') {
      return res.sendStatus(204);
    }
    next();
  };
};

export const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  errors = null
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message || 'success',
    data,
    errors,
  });
};

export const getEnums = (obj) => {
  return Object.values(obj);
};
