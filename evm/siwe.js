import { generateNonce, SiweMessage } from 'siwe';
import redis from '../utils/redis.js';
import logger from '../utils/logger.js';

export const createSIWEMessage = async ({
  prefix = 'login',
  domain = process.env.DOMAIN,
  address,
  statement = '',
  uri = process.env.BASE_URL,
  version = '1',
  chainId = '1',
}) => {
  let SIWEObject;

  try {
    SIWEObject = new SiweMessage({
      domain,
      address,
      statement,
      uri,
      version,
      chainId,
      nonce: generateNonce(),
      issuedAt: new Date().toISOString(),
    });

    await redis.setEx(
      `${prefix}:${address}`,
      60 * 3,
      SIWEObject.prepareMessage()
    );

    const message = await redis.get(`${prefix}:${address}`);
  } catch (error) {
    console.log(error);

    logger.error(error);
  }
  const message = await redis.get(`${prefix}:${address}`);

  return SIWEObject?.prepareMessage();
};

export const verifySIWEMessage = async ({
  prefix = 'login',
  signature,
  address,
}) => {
  const key = `${prefix}:${address}`;
  console.log(key);

  const message = await redis.get(key);

  if (!message) {
    return 'request not found';
  }

  const SIWEObject = new SiweMessage(message);

  try {
    const { data } = await SIWEObject.verify({
      signature: signature,
      nonce: SIWEObject.nonce,
    });
  } catch (error) {
    console.log(error);

    return error;
  }
};
