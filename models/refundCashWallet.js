import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import { getS3Url } from 'shared/index.js';
import mongoose from 'mongoose';

export const RefundWalletStatus = {
  ACTIVE: 'active',
  PROCESSING: 'processing',
  USED: 'used',
  REIMBURSED: 'reimbursed',
  TRANSFERRED: 'transferred',
};

const schema = new mongoose.Schema(
  {
    account: { type: ObjectId, ref: 'account', required: true },
    parentOrder: { type: ObjectId, ref: 'ecomParentOrder', required: true },
    order: { type: ObjectId, ref: 'ecomOrder', required: true },
    items: [
      new mongoose.Schema(
        {
          product: { type: ObjectId, ref: 'product' },
          name: String,
          image: { type: String, get: getS3Url },
          quantity: Number,
          amount: Number,
          grossAmount: Number,
          rate: Number,
        },
        { id: false, _id: false }
      ),
    ],
    tokens: { type: Number, ref: 'token', required: true },
    goldRate: { type: Number, required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    debitHistory: [
      {
        parentOrder: { type: ObjectId, ref: 'ecomParentOrder' },
        amount: Number,
        tokens: { type: Number },
        createdAt: Date,
      },
    ],
    expiresAt: { type: Date, required: true },
    transferredAt: { type: Date },
    isExpired: { type: Boolean },
    status: {
      type: String,
      enum: getEnums(RefundWalletStatus),
      default: RefundWalletStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

const RefundCashWallet = mongoose.model('refundCashWallet', schema);

schema.index({ account: 1 });

export default RefundCashWallet;
