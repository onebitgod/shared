import Metal from './metal.js';
import { ObjectId } from '../constants.js';
import Unit from './unit.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    merchant: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userCount: { type: Number, default: 0 },
    permissions: [
      {
        module: String,
        route: String,
        actions: [
          {
            type: String,
            enum: ['read', 'write', 'update', 'delete'],
          },
        ],
      },
    ],
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

const MerchantRole = mongoose.model('merchantRole', schema);

export default MerchantRole;
