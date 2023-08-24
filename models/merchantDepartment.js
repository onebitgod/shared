import mongoose from 'mongoose';
import Unit from './unit.js';
import Metal from './metal.js';
import { ObjectId } from '../constants.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    merchant: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    description: {
      type: String,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });
// schema.index({ shortName: 1 });

const MerchantDepartment = mongoose.model('merchantDepartment', schema);

export default MerchantDepartment;
