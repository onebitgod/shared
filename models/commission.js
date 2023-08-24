import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

export const CommissionStatus = {
  PENDING: 'pending',
  RECEIVED: 'received',
};

const schema = new mongoose.Schema(
  {
    from: { type: ObjectId, ref: 'account' },
    transaction: { type: ObjectId, ref: 'transaction' },
    invoice: { type: ObjectId, ref: 'invoice' },
    amount: Number,
    tax: Number,
    taxAmount: Number,
    totalAmount: Number,
    status: {
      type: String,
      default: CommissionStatus.PENDING,
    },
  },
  { timestamps: true }
);

const Commission = mongoose.model('commission', schema);

export default Commission;
