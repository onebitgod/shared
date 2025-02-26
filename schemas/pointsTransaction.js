import mongoose from 'mongoose';
import { ObjectId } from '../../constants/db.js';
import { getEnums } from '../../utils/helpers.js';

export const PointTransactionStatus = {
  PENDING: 'pending',
  FAILED: 'failed',
  COMPLETED: 'completed',
};

export const PointTransactionType = {
  CREDIT: 'credit',
  DEBIT: 'debit',
};

export const PointTransactionSource = {
  REFERRAL: 'referral',
  USER: 'user',
  QUOTE: 'quote',
  TRANSACTION: 'transaction',
};

const schema = new mongoose.Schema(
  {
    account: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },

    quote: {
      type: ObjectId,
      ref: 'quote',
      required: true,
    },

    points: {
      type: Number,
    },

    status: {
      type: String,
      enum: getEnums(PointTransactionStatus),
      default: PointTransactionStatus.PENDING,
    },

    type: {
      type: String,
      enum: getEnums(PointTransactionType),
    },

    source: {
      type: String,
      enum: getEnums(PointTransactionSource),
    },
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const QuoteSchema = mongoose.model('pointTransaction', schema);

export default QuoteSchema;
