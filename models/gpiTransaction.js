import { ObjectId } from '../constants.js';
import { SettlementStatus } from './settlement.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const GPIType = {
  PAY: 'pay',
  GIFT: 'gift',
};

export const GPITransactionStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const GPISettleIn = {
  CASH: 'cash',
  TOKEN: 'token',
};

export const GPISettlementStatus = SettlementStatus;

const schema = new mongoose.Schema(
  {
    type: { type: String, enum: getEnums(GPIType) },
    from: { type: ObjectId, ref: 'account' },
    to: { type: ObjectId, ref: 'account' },

    tokens: Number,
    rate: Number,
    amount: Number,

    charge: Number,
    chargeWithGST: Number,

    settledTokens: Number,
    settledRate: Number,
    settledAmount: Number,
    settledIn: { type: String, enum: getEnums(GPISettleIn) },

    settlement: { type: ObjectId, ref: 'settlement' },

    settlementStatus: {
      type: String,
      default: GPISettlementStatus.PENDING,
    },

    transactions: [
      {
        type: ObjectId,
        ref: 'transaction',
      },
    ],

    status: {
      type: String,
      enum: [
        GPITransactionStatus.PENDING,
        GPITransactionStatus.COMPLETED,
        GPITransactionStatus.FAILED,
      ],
    },
  },
  { timestamps: true }
);

const GPITransaction = mongoose.model('gpiTransaction', schema);

export default GPITransaction;
