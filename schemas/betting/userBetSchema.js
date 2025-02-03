import mongoose from 'mongoose';
import { ObjectId } from 'shared/constants/db.js';
import { getEnums } from 'shared/utils/helpers.js';

export const UserBetStatus = {
  PLACED: 'placed',
  WON: 'won',
  LOST: 'lost',
  WITHDRAWN: 'withdrawn',
};

export const UserBetSentiment = {
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

    bet: {
      type: ObjectId,
      ref: 'bet',
      required: true,
    },

    betCoins: Number,
    withdrawnCoins: Number,

    sentiment: {
      type: String,
      enum: getEnums(UserBetSentiment),
      required: true,
    },

    status: {
      type: String,
      enum: getEnums(UserBetStatus),
      default: UserBetStatus.PLACED,
    },
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const UserBetSchema = mongoose.model('bet', schema);

export default UserBetSchema;
