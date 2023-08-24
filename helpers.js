import {
  AccountType,
  ActionName,
  Application,
  AuthError,
  StateName,
  Variables,
  serviceTypes,
} from './constants.js';
import SeriesCounter from './models/seriesCounter.js';
import RazorPay from 'razorpay';
import bcrypt from 'bcrypt';
import client from 'axios';
import cryptoRandomString from 'crypto-random-string';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
import duration from 'dayjs/plugin/duration.js';
import { getS3Url } from './s3.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import redis from './redis.js';
import variables from './variables.js';
import { SlabName } from './models/slab.js';
import axios from './axios.js';
import fileUpload from './fileUpload.js';
import Meta from './models/meta.js';
import APIRouter from 'api-smart-router';

dayjs.extend(duration);
dotenv.config({ path: '../.env' });

export const isProduction = process.env.NODE_ENV === 'production';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const razorpay = new RazorPay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const stringToObjectId = (id) => {
  if (typeof id === 'string') {
    return new mongoose.Types.ObjectId(id);
  } else {
    return id;
  }
};

export const callService = async (service, method = 'post', path, body) => {
  try {
    const res = await axios({
      url: `http://${service}${path}`,
      method,
      data: body,
      timeout: 1000 * 8,
      headers: {
        'x-api-key': process.env.SERVICE_API_KEY,
      },
    });

    return {
      success: true,
      ...res,
    };
  } catch (err) {
    if (err.status && err.status >= 500) {
      throw err;
    }

    return {
      success: false,
      ...err,
    };
  }
};

export const gateway = new APIRouter({
  baseURL: 'http://gateway/',
  transformResponse: (res) => res.data.data,
  transformError: (err) => Promise.reject(err.response?.data || err),
});

export const assignDocument = (document, data) => {
  const payload = {};

  for (const field in data) {
    const [first, last] = field.split('.');

    if (!last) {
      // @ts-ignore
      payload[field] = data[field];
      continue;
    }

    // @ts-ignore
    payload[first] = {
      // @ts-ignore
      ...document[first],
      // @ts-ignore
      [last]: data[field],
    };
  }

  Object.assign(document, payload);

  return document;
};

export const getPercentageValue = (value, percentage, round = true) => {
  const percentageValue = value * (percentage / 100);
  return round ? roundValue(percentageValue, 2) : percentageValue;
};

export const getTaxBifurcation = async ({
  taxPercentage,
  taxAmount,
  isSameState,
}) => {
  const [sgst, cgst] = await variables.getMultiple([
    Variables.SGST,
    Variables.CGST,
  ]);

  const sgstPercentage = isSameState
    ? getPercentageValue(taxPercentage, sgst)
    : 0;
  const cgstPercentage = isSameState
    ? getPercentageValue(taxPercentage, cgst)
    : 0;
  const igstPercentage = isSameState ? 0 : taxPercentage;

  const sgstAmount = isSameState ? getPercentageValue(taxAmount, sgst) : 0;
  const cgstAmount = isSameState ? getPercentageValue(taxAmount, cgst) : 0;
  const igstAmount = isSameState ? 0 : roundValue(taxAmount, 2);

  return {
    sgstPercentage,
    cgstPercentage,
    igstPercentage,
    sgstAmount,
    cgstAmount,
    igstAmount,
  };
};

export const calculateCompoundInterest = (amount, rateOfInterest, date) => {
  const n = 1;
  const days = dayjs().diff(date, 'days');
  const years = days / 365;

  return amount * Math.pow(1 + rateOfInterest / 100 / n, n * years) - amount;
};

export const axiosClient = () => {
  const axios = client.create();

  axios.interceptors.response.use(
    (response) => response.data,
    (err) => {
      if (err.response) {
        return Promise.reject({
          status: err.response.status,
          ...(typeof err.response.data === 'object' ? err.response.data : {}),
        });
      } else if (err.request) {
        throw new Error(err.message);
      } else {
        throw new Error(err);
      }
    }
  );
  return axios;
};

export const generateOtp = () => {
  return '0000';
  // @ts-ignore
  return cryptoRandomString({
    type: 'numeric',
    length: 4,
  });
};

export const generateQrCode = () => {
  return cryptoRandomString({
    type: 'hex',
    length: 20,
  });
};

export const generateInvoiceNumber = () => {
  return cryptoRandomString({
    type: 'numeric',
    length: 8,
  });
};

export const parseNumber = (value) => {
  return parseFloat(value);
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

export const checkAuth =
  (populate = false) =>
    (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1];
      const secret = process.env.JWT_ACCESS_TOKEN_SECRET ?? '';

      if (!token)
        return sendResponse(res, 401, 'Authorization is required', null, {
          code: AuthError.NO_TOKEN,
        });

      jwt.verify(token, secret, {}, async (err, payload) => {
        if (err) {
          const errMessage =
            err.name === 'TokenExpiredError'
              ? 'Access token expired'
              : 'Invalid access token';

          sendResponse(res, 401, errMessage, null, {
            code:
              err.name === 'TokenExpiredError'
                ? AuthError.TOKEN_EXPIRED
                : AuthError.INVALID_TOKEN,
          });
          return;
        }
        // @ts-ignore
        if (payload.application == AccountType.MERCHANT_STAFF) {
          var [account, device] = await Promise.all([
            mongoose
              .model('merchantStaff')
              // @ts-ignore
              .findById(payload.accountId)
              .populate('role'),
            // @ts-ignore
            mongoose.model('device').findById(payload.deviceId).lean(),
          ]);
          account.type = AccountType.MERCHANT_STAFF;
          req.merchantId = account.merchant;
        } else {
          var [account, device] = await Promise.all([
            mongoose
              .model('account')
              // @ts-ignore
              .findById(payload.accountId)
              .populate(populate ? 'user' : null)
              .lean(),
            // @ts-ignore
            mongoose.model('device').findById(payload.deviceId).lean(),
          ]);
        }

        if (!account || !device)
          return sendResponse(res, 401, 'Account/device does not exist', null, {
            code: !account ? AuthError.ACCOUNT_DELETED : AuthError.DEVICE_DELETED,
          });

        if (account.type === AccountType.MERCHANT) req.merchantId = account._id;
        req.token = token;
        req.account = account;
        req.device = device;

        next();
      });
    };

export const checkServiceAuth = (req, res, next) => {
  if (req.headers['x-api-key'] !== process.env.SERVICE_API_KEY) {
    return sendResponse(res, 401, 'Invalid api key');
  }

  next();
};

export const checkAccountType =
  (type, populate = false) =>
    (req, res, next) => {
      return checkAuth(populate)(req, res, () => {
        if (Array.isArray(type)) {
          const isAllowed = type.find((item) => req.account.type === item);

          if (isAllowed) {
            return next();
          }
        }

        if (req.account.type === type) {
          return next();
        }

        if (req.account.type === type) {
          return next();
        }
        sendResponse(res, 403, 'Forbidden');
      });
    };

export const checkMerchantPermission = (route, action) => (req, res, next) => {
  return checkAuth(true)(req, res, () => {
    if (req.account.type === AccountType.MERCHANT) {
      return next();
    }
    if (req.account.type === AccountType.MERCHANT_STAFF) {
    }
    sendResponse(res, 401, 'Unauthorized');
  });
};

export const verifyMpin = async (deviceId, mpin, hash = '') => {
  const isValid = await bcrypt.compare(`${deviceId}-${mpin}`, hash);

  return isValid;
};

export const roundValue = (value, decimals = 2, direction = 'up') => {
  const pow = Math.pow(10, decimals);
  const fn = direction === 'up' ? Math.ceil : Math.floor;

  return fn(value * pow) / pow;
};

export const getEnums = (obj) => {
  return Object.values(obj);
};

/**
 *
 * @param {string} [from]
 * @param {string} [to]
 * @returns any
 */
export const parseDateFilter = (from, to, field = 'createdAt') => {
  const data = {};

  if (from) {
    data['$gte'] = dayjs(from, 'DD/MM/YYYY').startOf('day').toDate();
  }

  if (to) {
    data['$lte'] = dayjs(to, 'DD/MM/YYYY').endOf('day').toDate();
  }

  if (data['$gte'] || data['$lte']) {
    return {
      [field]: data,
    };
  }

  return {};
};

export const checkReferences =
  (items, property = 'body') =>
    async (req, res, next) => {
      if (!Array.isArray(items)) {
        items = [items];
      }

      const promises = [];
      const errors = {};

      for (const item of items) {
        const ids = [];
        const [parentField, subField] = item.field.split('.');

        const Model = mongoose.model(
          item.model.prototype?.modelName || item.model
        );

        const parentValue = req[property][parentField];
        if (!parentValue) continue;

        if (subField) {
          if (Array.isArray(parentValue)) {
            for (const bodyItem of parentValue) {
              if (bodyItem[subField]) ids.push(bodyItem[subField]);
            }
          } else {
            if (parentValue[subField]) ids.push(parentValue[subField]);
          }
        } else {
          if (Array.isArray(parentValue)) {
            ids.push(...parentValue);
          } else {
            ids.push(parentValue);
          }
        }

        const fn = Model.find({ _id: ids }).then((data) => {
          for (let i = 0; i < ids.length; i++) {
            const document = data.find((e) => e._id.equals(ids[i]));
            if (document) continue;

            let fieldError = '';

            if (Array.isArray(parentValue)) {
              if (subField) {
                fieldError = `${parentField}[${i}].${subField}`;
              } else {
                fieldError = `${item.field}[${i}]`;
              }
            } else {
              fieldError = item.field;
            }

            errors[parentField] = `${fieldError} does not exist`;
          }
        });

        promises.push(fn);
      }

      await Promise.all(promises);

      const errorMessage = Object.values(errors).join('. ');

      if (errorMessage) {
        return sendResponse(res, 400, errorMessage, errors);
      }
      next();
    };

export const verifyOtpService = async (mobile, otp) => {
  const key = `mobile:${mobile}`;
  const encrypted = await redis.get(key);
  const isValid = await bcrypt.compare(otp, encrypted || '');

  return isValid;
};

export const createPaymentOrder = async (body) => {
  const payment = await callService(
    serviceTypes.COMMON,
    'post',
    '/razorpay/orders',
    body
  );

  return payment.data;
};

export const getAppliedSlab = (ranges, value) => {
  const item = ranges.find((item) => item.min <= value && item.max >= value);

  return item?.value ?? 0;
};

export const getActionNameToState = (
  actionName,
  tokens,
  rest = {},
  isLeased
) => {
  let state = 'redeemable';
  let slabName = 'instant';
  let updates = {};
  let toState = {};

  switch (actionName) {
    case ActionName.INSTANT_BUY_GOLD:
    case ActionName.BUY_RESERVE:
    case ActionName.GIP_BONUS:
      state = 'redeemable';
      updates['instant.redeemable'] = tokens;
      toState = {
        instant: {
          [isLeased ? 'leased' : 'nonLeased']: tokens,
        },
      };
      break;
    case ActionName.INSTANT_SELL_GOLD:
      state = 'redeemable';
      updates['instant.redeemable'] = -tokens;
      toState = {
        instant: {
          nonLeased: tokens,
        },
      };
      break;
    case ActionName.GIP_INITIATE:
    case ActionName.GIP_INSTALLMENT:
      state = 'onHold';
      updates['gip.onHold'] = tokens;
      toState = {
        gip: {
          [isLeased ? 'leased' : 'nonLeased']: tokens,
        },
      };
      break;
    case ActionName.GIP_SKIP_INSTALLMENT:
      state = 'onHold';
      updates['gip.onHold'] = -tokens;
      break;
    case ActionName.GIP_CANCEL:
      state = 'onHold';
      updates['gip.onHold'] = -tokens;
      break;
    case ActionName.SELL_RESERVE:
      state = 'redeemable';
      toState = {
        instant: {
          nonLeased: tokens,
        },
      };
      break;
    case ActionName.UPLOAD_GOLD:
      state = 'redeemable';
      updates['uploaded.redeemable'] = tokens;
      toState = {
        uploaded: {
          leased: tokens,
        },
      };
      break;
    case ActionName.BID_BUY_HOLD:
      state = 'redeemable';
      updates['bidBuy.onHold'] = tokens;
  }

  if (
    [ActionName.INSTANT_BUY_GOLD, ActionName.BUY_RESERVE].includes(actionName)
  ) {
    slabName = SlabName.INSTANT_GOLD_INTEREST;
  } else if (
    [ActionName.GIP_INITIATE, ActionName.GIP_INSTALLMENT].includes(actionName)
  ) {
    slabName = SlabName.GPI_GOLD_INTEREST;
  } else if ([ActionName.UPLOAD_GOLD]) {
    slabName = SlabName.UPLOAD_GOLD_INTEREST;
  }

  return {
    state,
    updates: Object.assign(updates, rest),
    toState,
    slabName,
  };
};

export const prefixKeys = (object, prefix) => {
  const finalObject = {};

  for (const key in object) {
    finalObject[`${prefix}${key}`] = object[key];
  }

  return finalObject;
};

export const getAccountSubscription = async (accountId, application) => {
  const data = await mongoose
    .model('subscription')
    .findOne({
      account: accountId,
      accountType: application,
      status: 'active',
    })
    .lean();
  if (!data) return null;

  if (dayjs().isAfter(data.expiry)) {
    return null;
  }

  return data;
};

export class APIError extends Error {
  constructor(statusCode, message, errors = {}) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

export const getCustodian = async (id, fetchBalance = true) => {
  const data = await mongoose
    .model('account')
    .findOne({
      _id: id,
      modules: 'custodian',
    })
    .lean();

  if (!data) throw new APIError(400, 'Custodian does not exist');
};

export const getInstallmentDate = (cycle, startDate, paidCount) => {
  let duration;

  switch (cycle) {
    case 'daily':
      duration = { name: 'day', value: 1 };
      break;
    case 'weekly':
      duration = { name: 'week', value: 1 };
      break;
    case 'bi_weekly':
      duration = { name: 'week', value: 2 };
      break;
    case 'monthly':
      duration = { name: 'month', value: 1 };
      break;
    default:
      throw new Error('Invalid cycle');
  }

  return (
    dayjs(startDate)
      // @ts-ignore
      .add(duration.value * (paidCount - 1), duration.name)
      .toDate()
  );
};

export const verifyPayment = async (data) => {
  const paymentModel = await mongoose.model('razorpayPayment').findOne({
    orderId: data.orderId,
  });

  if (!paymentModel) throw new APIError(404, 'payment not found');

  const payment = await razorpay.payments.fetch(data.paymentId);
  if (!payment) throw new APIError(400, 'payment not found');

  if (data.orderId !== payment.order_id)
    throw new APIError(400, 'order_id did not matched');

  // if (paymentModel.status !== 'pending')
  //   throw new APIError(400, 'already paid');

  var paymentObject = {
    method: payment.method,
    status: 'paid',
    paymentId: payment.id,
    bankTransferId: payment.acquirer_data.bank_transaction_id ?? '',
    feeAmount: payment.fee / 100,
    taxAmount: payment.tax / 100,
    settledAmount:
      // @ts-ignore
      payment.amount / 100 - payment.fee / 100 - payment.tax / 100,
    paidAt: new Date(payment.created_at * 1000),
  };

  assignDocument(paymentModel, paymentObject);

  await paymentModel.save();

  return {
    fee: paymentObject.feeAmount + paymentObject.taxAmount,
    ...paymentModel.toJSON(),
  };
};

export const populateS3Url = (array, fields) => {
  return array.map((item) => {
    const payload = item;

    if (!Array.isArray(fields)) {
      fields = [fields];
    }

    for (const field of fields) {
      payload[field] = getS3Url(item[field]);
    }

    return payload;
  });
};

export const createCRN = async () => {
  const currentDate = dayjs().format('DDMMYY');
  const now = new Date();
  let counter = 4095;
  let seriesCounter = await SeriesCounter.findOne({
    type: 'crn',
    createdAt: {
      $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    },
  });
  if (!seriesCounter) {
    seriesCounter = new SeriesCounter({
      initials: 'MG',
      type: 'crn',
      counter: 1,
      hexCounter: 1,
    });
  } else {
    seriesCounter.counter = seriesCounter.counter + 1;
    if (seriesCounter.counter > 9999) {
      seriesCounter.hexCounter = seriesCounter.hexCounter + 1;
      seriesCounter.counter = 0;
    }
  }
  const hexCode = seriesCounter.hexCounter
    .toString(16)
    .padStart(3, '0')
    .toUpperCase();
  const count = seriesCounter.counter.toString().padStart(4, '0').toUpperCase();

  await seriesCounter.save();

  return `${currentDate}${hexCode}${count}`;
};

export const getArrayFieldSum = (array, field) => {
  return array.reduce((prev, item) => (prev += item[field]), 0);
};

export const parseGPI = (string) => {
  const [mobile, suffix] = string.toLowerCase().split('@');

  if (suffix !== 'mygold') return null;
  if (mobile.length !== 10) return null;

  return mobile;
};

export const cloneModel = (model, data) => {
  const { _id, ...rest } = data;

  return new model(rest);
};

export const validate = (schema, options = {}) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(
      // @ts-ignore
      options?.field ? req[options.field] : req.body,
      {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
        errors: {
          wrap: {
            label: '',
          },
        },
        ...options,
      }
    );

    if (error) {
      const errors = error.details.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.context?.key || 'error']: cur.message,
        }),
        { error: null }
      );
      // @ts-ignore
      errors.error = error.message;
      console.error(errors);
      return sendResponse(res, 422, 'Validation error', null, errors);
    }

    req.body = value;
    next();
  };
};

export const updateMeta = async (type, identifier, data) => {
  await Meta.updateOne({ type, identifier }, data, { upsert: true });
};

export const createPgOrder = async ({ amount }) => {
  const order = await razorpay.orders.create({
    currency: 'INR',
    amount: amount * 100,
  });

  return order;
};

export const handleGatewayError = (err) => (req, res, next) => {
  if (err.hasOwnProperty('data') && err.hasOwnProperty('errors')) {
    if (err.status === 422) {
      throw err;
    }
    res.status(err.status).json(err);
  } else {
    next(err);
  }
};

export const cors = (options = {}) => {
  return (req, res, next) => {
    if (req.method.toLowerCase() === 'options') {
      return res.sendStatus(204);
    }
    next();
  };
};

export const getKeyByValue = (object, value) => {
  const result = Object.keys(object).reduce((acc, key) => {
    if (object[key] === value) {
      return key;
    }
    return acc;
  }, null);

  return result;
};

export const getPostalDetails = async (code) => {
  const data = await axios.get(`https://api.postalpincode.in/pincode/${code}`);

  if (!data[0].PostOffice) return null;

  return {
    code,
    city: data[0].PostOffice[0].District,
    state: data[0].PostOffice[0].State,
    stateCode: getKeyByValue(StateName, data[0].PostOffice[0].State),
  };
};

export function calculateDistance({ lat1, lon1, lat2, lon2 }) {
  const R = 6371; // Earth's radius in km
  const φ1 = (lat1 * Math.PI) / 180; // Convert latitude from degrees to radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return roundValue(distance, 1, 'up');
}
