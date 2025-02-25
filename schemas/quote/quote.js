import mongoose from 'mongoose';
import { ObjectId } from '../../constants/db.js';
import { getEnums } from '../../utils/helpers.js';

export const QuoteCommissionType = {
  FIXED: 'fixed',
  PERCENTAGE: 'percentage',
};

export const QuoteGame = {
  CRICKET: 'cricket',
};

export const QuoteStatus = {
  CREATED: 'created',
  ACTIVE: 'active',
  EXPIRED: 'expired',
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

    qouteText: {
      type: String,
      default: 'dummy',
      required: true,
    },

    minimumPoints: {
      type: Number,
    },

    status: {
      type: String,
      enum: getEnums(QuoteStatus),
      default: QuoteStatus.CREATED,
    },

    commission: {
      type: {
        type: String,
        enum: getEnums(QuoteCommissionType),
        default: QuoteCommissionType.FIXED,
      },
      value: {
        type: Number,
        default: 0,
      },
    },

    result: {
      type: {
        type: String,
        enum: getEnums(QuoteResponseSentiment),
        default: null,
      },
    },

    game: {
      type: String,
      enum: getEnums(QuoteGame),
      default: QuoteGame.CRICKET,
    },
    conditionRefId: String,
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const QuoteSchema = mongoose.model('quote', schema);

export default QuoteSchema;
