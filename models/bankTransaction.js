import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const BankTransactionStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

export const BankTransactionMode = {
  NEFT: 'neft',
  IMPS: 'imps',
  RTGS: 'rtgs',
  UPI: 'upi',
};

const schema = new mongoose.Schema(
  {
    holderName: { type: String },
    transactionId: { type: String },
    transactionMode: { type: String, enum: getEnums(BankTransactionMode) },
    transactionDate: { type: Date },
    transactionAmount: { type: Number },
    reason: { type: String },
    account: { type: ObjectId, ref: 'account' },
    bankAccount: { type: ObjectId, ref: 'bankAccount' },
    status: {
      type: String,
      enum: getEnums(BankTransactionStatus),
      default: BankTransactionStatus.PENDING,
    },
  },
  { timestamps: true }
);

const BankTransaction = mongoose.model('bankTransaction', schema);

export default BankTransaction;
