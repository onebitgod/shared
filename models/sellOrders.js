import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

export const SellOrderStatus = {
  PENDING: 'pending',
  INITIATED: 'initiated',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
};

const schema = new mongoose.Schema(
  {
    tokens: Number,
    rate: Number,
    amount: Number,
    account: { type: ObjectId, ref: 'account' },
    bankAccount: { type: ObjectId, ref: 'bankAccount' },
    transaction: { type: ObjectId, ref: 'transaction' },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const SellOrder = mongoose.model('sellOrder', schema);

export default SellOrder;
