import session from 'express-session';
import RedisStore from 'connect-redis';
import redis from '../utils/redis.js';

export const checkSession = (req, res, next) => {
  if (!req.account) {
    return sendResponse(res, 401, 'Authorization is required');
  }
  next();
};

export const sessionMiddleware = () => {
  const sessionManager = session({
    name: 'id',
    secret: process.env.JWT_ACCESS_TOKEN_SECRET || '',
    resave: false,
    saveUninitialized: false,
    rolling: false,
    proxy: true,
    cookie: {
      //sameSite: 'none',
      maxAge: 60000 * 60 * 48,
      secure: false,
    },
    store: new RedisStore({
      client: redis,
      prefix: 'session:',
    }),
  });

  return (req, res, next) => {
    sessionManager(req, res, (err) => {
      if (err) {
        return next(err);
      }
      req.account = req.session.account;
      next();
    });
  };
};
