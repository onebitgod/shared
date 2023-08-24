import { createClient } from 'redis';
import logger from './logger.js';

const redis = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

export const redisPublisher = redis.duplicate();
export const redisSubscriber = redis.duplicate();

export const connectRedis = async () => {
  await Promise.all([
    redis.connect(),
    redisPublisher.connect(),
    redisSubscriber.connect(),
  ]);

  logger.info('Redis connected');
};

export default redis;
