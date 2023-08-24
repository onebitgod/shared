import mongoose, { Mongoose } from 'mongoose';

import { ObjectId } from '../constants.js';
import cryptoRandomString from 'crypto-random-string';

const schema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
      unique: true,
      default: () =>
        cryptoRandomString({
          type: 'numeric',
          length: 12,
        }),
    },
    customer: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    tokens: {
      quantity: Number,
      transactions: [{ type: ObjectId, ref: 'transaction' }],
    },
    tokenAmount: {
      type: Number,
      default: 0,
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    razorpay: {
      amount: Number,
      orderId: String,
    },
    address: {
      type: ObjectId,
      ref: 'address',
    },
    goldRate: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    itemCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'completed'],
    },
  },
  { timestamps: true, id: false }
);

const EcomParentOrder = mongoose.model('ecomParentOrder', schema);

export default EcomParentOrder;
