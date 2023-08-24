import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const InvoiceType = {
  SALE: 'sale',
  PURCHASE: 'purchase',
  SERVICE: 'service',
  COMMISSION: 'commission',
};

export const InvoiceStatus = {
  PENDING: 'pending',
  PAID: 'paid',
};

export const InvoiceSettlementStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SETTLED: 'settled',
};

const taxDetails = new mongoose.Schema(
  {
    sgstPercentage: Number,
    cgstPercentage: Number,
    igstPercentage: Number,
    sgstAmount: Number,
    cgstAmount: Number,
    igstAmount: Number,
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    invoiceNumber: String,
    type: { type: String, enum: getEnums(InvoiceType) },
    actionName: String,
    moduleName: String,
    category: String,
    billFrom: { type: ObjectId, ref: 'account' },
    billTo: { type: ObjectId, ref: 'account' },
    items: [
      new mongoose.Schema(
        {
          description: String,
          hsn: String,
          quantity: Number,
          rate: Number,
          tax: Number,
          taxAmount: Number,
          taxDetails,
          amount: Number,
          grossAmount: Number,
        },
        { _id: false }
      ),
    ],
    taxAmount: Number,
    taxDetails,
    totalAmount: Number,
    transaction: { type: ObjectId, ref: 'transaction' },
    bankTransaction: { type: ObjectId, ref: 'bankTransaction' },
    payment: { type: ObjectId, ref: 'razorpayPayment' },
    settlement: { type: ObjectId, ref: 'settlement' },
    commission: { type: ObjectId, ref: 'commission' },
    custody: { type: ObjectId, ref: 'custody' },
    settlementStatus: {
      type: String,
      enum: getEnums(InvoiceSettlementStatus),
      default: InvoiceSettlementStatus.PENDING,
    },
    status: {
      type: String,
      default: InvoiceStatus.PENDING,
    },
  },
  { timestamps: true, id: false }
);

const Invoice = mongoose.model('invoice', schema);

export default Invoice;
