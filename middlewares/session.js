import session from 'express-session';
import RedisStore from 'connect-redis';
import redis from '../utils/redis.js';

const checkSession = (req, res, next) => {
  if (!req.user) {
    return sendResponse(res, 401, 'Authorization is required');
  }
  next();
};

const sessionMiddleware = () => {
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
      req.user = req.session.user;
      next();
    });
  };
};

export default { sessionMiddleware, checkSession };
