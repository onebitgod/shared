import mongoose from 'mongoose';
import { ObjectId } from '../../constants/db.js';
import { getEnums } from '../../utils/helpers.js';

export const QuoteResponseStatus = {
  PLACED: 'placed',
  WON: 'won',
  LOST: 'lost',
  WITHDRAWN: 'withdrawn',
};

export const QuoteResponseSentiment = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
};

const schema = new mongoose.Schema(
  {
    account: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },

    qoute: {
      type: ObjectId,
      ref: 'qoute',
      required: true,
    },

    quotePoints: Number,
    withdrawnPoints: Number,

    sentiment: {
      type: String,
      enum: getEnums(QuoteResponseSentiment),
      required: true,
    },

    status: {
      type: String,
      enum: getEnums(QuoteResponseStatus),
      default: QuoteResponseStatus.PLACED,
    },
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const quoteResponseSchema = mongoose.model('quoteResponse', schema);

export default quoteResponseSchema;
