import { ObjectId, PENDING_PAYMENT } from '../constants.js';

import mongoose from 'mongoose';
import { getEnums } from '../helpers.js';

export const GIPType = {
  STANDARD: 'standard',
  CUSTOM: 'custom',
};

export const GIPMode = {
  FIAT: 'fiat',
  TOKEN: 'token',
};

export const GIPTransferStatus = {
  PENDING: 'pending',
  SHIFTED: 'shifted',
  UPLOADED: 'uploaded',
};

export const GIPStatus = {
  PENDING_PAYMENT,
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  FORFEITED: 'forfeited',
};

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [GIPType.STANDARD, GIPType.CUSTOM],
    },
    mode: {
      type: String,
      enum: [GIPMode.FIAT, GIPMode.TOKEN],
    },
    isLeaseEnabled: { type: Boolean, default: false },

    plan: { type: ObjectId, ref: 'plan' },
    cyclePeriod: { type: ObjectId, ref: 'cyclePeriod' },
    account: { type: ObjectId, ref: 'account' },
    custodian: { type: ObjectId, ref: 'account' },
    payment: { type: ObjectId, ref: 'payment' },

    balance: Number,
    onHold: Number,
    minValue: Number,
    duration: Number,
    cycle: String,
    gracePeriod: Number,
    lockInPeriod: Number,
    bonusPercentage: Number,

    skipCount: Number,
    unpaidSkipCount: Number,
    unpaidInvestmentCount: Number,

    maxSkipAllowed: Number,
    maxUnpaidSkipAllowed: Number,
    maxUnpaidInvestmentAllowed: Number,

    dueDate: Date,
    maturityDate: Date,
    lastPaidAt: Date,
    forfeitedAt: Date,
    cancelledAt: Date,
    transferredAt: Date,

    installments: [
      new mongoose.Schema(
        {
          id: String,
          type: String,
          count: Number,
          tokens: Number,
          amount: Number,
          createdAt: Date,
        },
        { _id: false, id: false }
      ),
    ],

    installmentPaid: { type: Number, default: 0 },

    transferStatus: {
      type: String,
      enum: [
        GIPTransferStatus.PENDING,
        GIPTransferStatus.SHIFTED,
        GIPTransferStatus.UPLOADED,
      ],
      default: GIPTransferStatus.PENDING,
    },

    status: {
      type: String,
      enum: getEnums(GIPStatus),
      default: GIPStatus.PENDING_PAYMENT,
    },
  },
  { timestamps: true }
);

schema.index({ account: 1, status: 1 });

schema.index({ custodian: 1, status: 1 });

const GIP = mongoose.model('gip', schema);

export default GIP;
