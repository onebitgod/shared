import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const SettlementDirection = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing',
};

export const SettlementStatus = {
  HOLD: 'hold',
  PENDING: 'pending',
  PROCESSING: 'processing',
  SETTLED: 'settled',
};

const schema = new mongoose.Schema(
  {
    direction: { type: String, enums: getEnums(SettlementDirection) },
    amount: Number,
    account: { type: ObjectId, ref: 'account' },
    transaction: { type: ObjectId, ref: 'transaction' },
    settledAt: Date,
    paymentDetails: {
      referenceNo: String,
      utr: String,
      date: Date,
    },
    status: {
      type: String,
      enum: getEnums(SettlementStatus),
      default: SettlementStatus.PENDING,
    },
  },
  { timestamps: true }
);

const Settlement = mongoose.model('settlement', schema);

export default Settlement;
