import mongoose from 'mongoose';
import { getS3Url, AccountType } from 'shared/index.js';
import { getEnums } from '../helpers.js';

export const PanVerificationStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

const schema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      enum: getEnums(AccountType),
      required: true,
    },
    account: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    pan: {
      type: String,
      required: true,
    },
    nameOnPan: {
      type: String,
      required: true,
    },
    nameOnAadhaar: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
        get: getS3Url,
      },
    ],
    rejectionReason: {
      type: String,
    },
    status: {
      type: String,
      enum: getEnums(PanVerificationStatus),
      default: PanVerificationStatus.PENDING,
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });

const PanVerification = mongoose.model('panverification', schema);

export default PanVerification;
