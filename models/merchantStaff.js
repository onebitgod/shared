import mongoose from 'mongoose';
import Unit from './unit.js';
import Metal from './metal.js';
import { ObjectId } from '../constants.js';
import { getS3Url } from '../s3.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      get: getS3Url,
    },
    merchant: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    role: {
      type: ObjectId,
      ref: 'merchantRole',
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });
// schema.index({ shortName: 1 });

const MerchantStaff = mongoose.model('merchantStaff', schema);

export default MerchantStaff;
