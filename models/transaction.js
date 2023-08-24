import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

export const TransactionStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

const schema = new mongoose.Schema(
  {
    from: { type: ObjectId, ref: 'account' },
    to: { type: ObjectId, ref: 'account' },
    custodian: { type: ObjectId, ref: 'account' },
    account: { type: ObjectId, ref: 'account' },
    rate: Number,
    tokens: Number,
    amount: Number,
    tax: Number,
    taxAmount: Number,
    commissionAmount: Number,
    grossAmount: Number,
    moduleName: { type: String },
    actionName: { type: String },
    invoice: { type: ObjectId, ref: 'invoice' },
    custody: { type: ObjectId, ref: 'custody' },
    payment: { type: ObjectId, ref: 'razorpayPayment' },
    bankAccount: { type: ObjectId, ref: 'bankAccount' },
    bankTransaction: { type: ObjectId, ref: 'bankTransaction' },
    status: {
      type: String,
      enum: [
        TransactionStatus.PENDING,
        TransactionStatus.COMPLETED,
        TransactionStatus.FAILED,
      ],
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('transaction', schema);

export default Transaction;
