import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, jwtConfig.accessTokenSecret, {
    expiresIn: jwtConfig.accessTokenExpiresIn,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, jwtConfig.accessTokenSecret);
};
