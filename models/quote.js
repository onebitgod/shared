import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { ObjectId } from '../constants.js';

export const QuoteStatus = {
  CREATED: 'created',
  COMPLETED: 'completed',
};

export const PaymentHandler = {
  PARTNER: 'partner',
  COMPANY: 'company',
};

const taxDetailSchema = new mongoose.Schema(
  {
    sgstPercentage: { type: Number },
    cgstPercentage: { type: Number },
    igstPercentage: { type: Number },
    sgstAmount: { type: Number },
    cgstAmount: { type: Number },
    igstAmount: { type: Number },
    otherAmount: { type: Number },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    identifier: { type: String },
    type: { type: String, enum: ['buy', 'sell', 'transfer'] },
    rate: { type: Number },
    quantity: { type: Number },
    value: { type: Number },
    valueType: { type: String, enum: ['quantity', 'amount'] },
    taxType: { type: String, enum: ['cgst/sgst', 'igst', 'none'] },
    taxPercentage: { type: Number },
    taxAmount: { type: Number },
    taxDetails: taxDetailSchema,
    preTaxAmount: { type: Number },
    totalAmount: { type: Number },
    customer: { type: ObjectId, ref: 'account' },
    custodian: { type: ObjectId, ref: 'account' },
    billingAddress: { type: String, ref: 'address' },
    paymentHandler: {
      type: String,
      enum: Object.values(PaymentHandler),
      default: PaymentHandler.PARTNER,
    },
    paymentGateway: { type: String, enum: ['razorpay', 'phonepe'] },
    paymentId: { type: String },
    lease: { type: Boolean, default: false },
    hubId: { type: ObjectId },
    gipId: { type: ObjectId },
    actionName: { type: String },
    moduleName: { type: String },
    commission: {
      percentage: { type: Number },
      amount: { type: Number },
      taxPercentage: { type: Number },
      taxAmount: { type: Number },
      taxDetails: taxDetailSchema,
      totalAmount: { type: Number },
    },
    expiresAt: { type: Date },
    status: {
      type: String,
      enum: Object.values(QuoteStatus),
      default: QuoteStatus.CREATED,
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model('quote', schema);

export default Quote;
