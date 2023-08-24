import Queue from 'bull';

export const businessSettlementQueue = new Queue(
  'businessSettlement',
  process.env.REDIS_URL
);

export const notificationQueue = new Queue(
  'notification',
  process.env.REDIS_URL
);
