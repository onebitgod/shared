import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SETTLED: 'settled',
};

const schema = new mongoose.Schema(
  {
    module: { type: String },
    tokens: { type: Number },
    data: { type: Object },
    method: { type: String },
    account: { type: ObjectId, ref: 'account' },
    orderId: { type: String, required: true },
    paymentId: { type: String },
    bankTransferId: { type: String },
    utr: { type: String },
    feeAmount: { type: Number },
    taxAmount: { type: Number },
    amount: Number,
    settledAmount: Number,
    paidAt: Date,
    settledAt: Date,
    status: {
      type: String,
      enum: getEnums(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
  },
  { timestamps: true }
);

schema.index({ orderId: 1 });
schema.index({ account: 1 });

const RazorpayPayment = mongoose.model('razorpayPayment', schema);

export default RazorpayPayment;
