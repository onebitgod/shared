import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

export const ReserveStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  USED: 'used',
};

const schema = new mongoose.Schema(
  {
    tokens: Number,
    amount: Number,
    rate: Number,
    interestApplied: Number,
    holdTokens: Number,
    duration: Number,
    account: { type: ObjectId, ref: 'account' },
    custodians: [{ type: ObjectId, ref: 'custodian' }],
    mainCustodian: { type: ObjectId, ref: 'custodian' },
    transactions: [{ type: ObjectId }],
    installments: [
      new mongoose.Schema(
        {
          id: ObjectId,
          type: String,
          rate: Number,
          tokens: Number,
          count: Number,
          createdAt: Date,
        },
        { _id: false }
      ),
    ],
    dueDate: Date,
    usedAt: Date,
    expiresAt: Date,
    status: {
      type: String,
      enum: [ReserveStatus.ACTIVE, ReserveStatus.EXPIRED, ReserveStatus.USED],
      default: ReserveStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

const Reserve = mongoose.model('reserve', schema);

export default Reserve;
