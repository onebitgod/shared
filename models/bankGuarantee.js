import { MerchantModules, ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const BGStatus = {
  VERIFICATION_PENDING: 'verification_pending',
  EXPIRED: 'expired',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  PENDING: 'pending',
  PROVIDED: 'provided',
  NOT_REQUIRED: 'not_required',
};

const schema = new mongoose.Schema(
  {
    account: { type: ObjectId, ref: 'account' },
    merchant: { type: ObjectId, ref: 'merchant' },
    amount: { type: Number },
    expiryDate: { type: Date },
    modules: [{ type: String, enum: getEnums(MerchantModules) }],
    url: { type: String },
    rejectReason: { type: String },
    status: {
      type: String,
      enum: getEnums(BGStatus),
      default: BGStatus.VERIFICATION_PENDING,
    },
  },
  { timestamps: true }
);

const BankGuarantee = mongoose.model('bankGuarantee', schema);

export default BankGuarantee;
