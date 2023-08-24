import { WebSocket } from 'ws';
import logger from './logger.js';
import { callService, roundValue } from './helpers.js';
import { redisSubscriber } from './redis.js';

const goldPrice = {
  buyPrice: 0,
  sellPrice: 0,
};

// const socket = new WebSocket('ws://43.204.239.109:3000');

// socket.on('open', () => {
//   logger.info('Connected gold price server');
// });

// socket.on('message', (message) => {
//   goldPrice.buyPrice = JSON.parse(message.toString()).buyPrice + 100;
//   goldPrice.sellPrice = JSON.parse(message.toString()).sellPrice + 100;
// });

export const getGoldPrice = () => {
  return goldPrice;
};

export const getGoldPriceSource = async (id, type = 'b2c') => {
  return callService(
    'gold_price',
    'get',
    `/latest?merchantId=${id ?? ''}&type=${type}`
  ).then((res) => res.data);
};

export const getGoldPriceSources = async () => {
  return callService('gold_price', 'get', '/list').then((res) => res.data);
};

export const getMMTCPrice = async () => {
  const buy = await callService('gateway', 'post', '/buy/price');
  const sell = await callService('gateway', 'post', '/sell/price');

  if (!buy.success || !sell.success) {
    throw new Error('mmtc server is down');
  }

  return {
    buyPrice: buy.data.rate,
    sellPrice: sell.data.rate,
  };
};

redisSubscriber.subscribe('gold_price', (data) => {
  Object.assign(goldPrice, JSON.parse(data));
});
