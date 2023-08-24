import { ObjectId } from '../constants.js';
import { getS3Url } from 'shared/index.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: String,
    mobile: { type: String, unique: true },
    email: { type: String, unique: true },
    image: { type: String, get: getS3Url },
    mpin: String,
    aadhaar: String,
    deviceId: String,
    deviceHash: String,
    role: {
      type: String,
      enum: ['manager', 'captain'],
    },
    modules: [
      {
        type: String,
        enum: [
          'delivery',
          'return',
          'verifier',
          'refiner',
          'accounting',
          'custodian',
          'lease_partner',
          'hub',
        ],
      },
    ],
    merchant: {
      type: ObjectId,
      ref: 'account',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    fcmToken: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

schema.index({ mobile: 1 });
schema.index({ merchant: 1 });

const MerchantUser = mongoose.model('merchantUser', schema);

export default MerchantUser;
