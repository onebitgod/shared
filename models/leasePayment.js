import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const LeasePaymentStatus = {
  PENDING: 'pending',
  PAID: 'paid',
  PRICE_BLOCKED: 'price_blocked',
  VERIFIED: 'verified',
};

export const BankTransactionMode = {
  NEFT: 'neft',
  IMPS: 'imps',
  RTGS: 'rtgs',
  UPI: 'upi',
};

const schema = new mongoose.Schema(
  {
    custodian: { type: ObjectId, ref: 'account' },
    leasePartner: { type: ObjectId, ref: 'account' },
    contract: { type: ObjectId, ref: 'merchantLeaseContract' },
    goldRate: { type: Number, default: 0 },
    principleGold: { type: Number, default: 0 },
    interestGold: { type: Number },
    amount: { type: Number, default: 0 },
    commission: {
      gold: { type: Number },
      amount: { type: Number, default: 0 },
      percent: { type: Number },
    },
    paidAmount: { type: Number, default: 0 },
    paymentInfo: [
      {
        bankName: { type: String },
        transactionId: { type: String },
        transferMode: { type: String, enum: getEnums(BankTransactionMode) },
        date: { type: Date },
        amount: { type: Number, default: 0 },
      },
    ],
    status: { type: String, default: LeasePaymentStatus.PENDING },
  },
  { timestamps: true }
);

const LeaseInterestPayment = mongoose.model('leasePayment', schema);

export default LeaseInterestPayment;
