import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const LeaseSource = {
  INSTANT: 'instant',
  GIP: 'gip',
  UPLOAD: 'upload',
};

const schema = new mongoose.Schema(
  {
    source: { type: String, enum: getEnums(LeaseSource) },
    transaction: { type: ObjectId, ref: 'transaction' },
    account: { type: ObjectId, ref: 'account' },
    custodian: { type: ObjectId, ref: 'account' },
    tokens: { type: Number },
    balance: { type: Number },
    history: [
      {
        tokens: { type: Number },
        interestEarned: { type: Number },
        transaction: { type: ObjectId, ref: 'transaction' },
        createdAt: { type: Date },
      },
    ],
    totalInterest: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Lease = mongoose.model('lease', schema);

export default Lease;
