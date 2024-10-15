import { createClient, createCluster } from 'redis';

const isCluster = process.env.REDIS_CLUSTER === 'true';

const redis = isCluster
  ? createCluster({
      rootNodes: [{ url: process.env.REDIS_URL }],
    })
  : createClient({
      url: process.env.REDIS_URL,
    });

export const redisPublisher = redis.duplicate();
export const redisSubscriber = redis.duplicate();

export const connectRedis = async () => {
  await Promise.all([
    redis.connect(),
    redisPublisher.connect(),
    redisSubscriber.connect(),
  ]);
};

redis.on('error', console.log);

export default redis;
