import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    id: String,
    type: String,
    name: String,
    model: String,
    hash: String,
    ip: String,
    refreshToken: String,
    account: {
      type: ObjectId,
      ref: 'account',
    },
    createdAt: {
      type: Date,
      expires: 60 * 60 * 24 * 30,
      default: () => new Date(),
    },
  },
  { id: false }
);

schema.index({ account: 1 });
schema.index({ refreshToken: 1 });

const Device = mongoose.model('device', schema);

export default Device;
