import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const ReferralHistoryStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
};

const schema = new mongoose.Schema(
  {
    type: String,
    referral: { type: ObjectId, ref: 'referral' },
    referrer: { type: ObjectId, ref: 'account' },
    referee: { type: ObjectId, ref: 'account' },
    gip: { type: ObjectId, ref: 'gip' },
    refereeEarnings: {
      total: 0,
    },
    referrerEarnings: {
      total: 0,
    },
    tokensEarned: {
      referrer: { type: Number, default: 0 },
      referee: { type: Number, default: 0 },
    },
    status: { type: String, enum: getEnums(ReferralHistoryStatus) },
  },
  { timestamps: true }
);

const ReferralHistory = mongoose.model('referralHistory', schema);

export default ReferralHistory;
