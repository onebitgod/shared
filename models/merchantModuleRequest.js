import { MerchantModules, ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const MerchantModuleRequestStatus = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  APPROVED: 'approved',
};

export const PendingStatus = {
  UNDER_PROCESS: 'under_process',
  BG_REQUIRED: 'bg_required',
  GST_VERIFICATION_PENDING: 'gst_verification_pending',
};

const schema = new mongoose.Schema(
  {
    merchant: { type: ObjectId, ref: 'account' },
    module: { type: String, enum: getEnums(MerchantModules) },
    rejectedReason: { type: String },
    bgOffered: { type: Number, default: 0 },
    pendingStatus: {
      type: String,
      enum: getEnums(PendingStatus),
      default: PendingStatus.bg_required,
    },
    status: {
      type: String,
      enum: getEnums(MerchantModuleRequestStatus),
      default: MerchantModuleRequestStatus.PENDING,
    },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

const MerchantModuleRequest = mongoose.model('merchantModuleRequest', schema);

export default MerchantModuleRequest;
