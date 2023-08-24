import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: String,
    merchant: { type: ObjectId, ref: 'account' },
  },
  { timestamps: true }
);

const SecurityGuard = mongoose.model('securityGuard', schema);

export default SecurityGuard;
