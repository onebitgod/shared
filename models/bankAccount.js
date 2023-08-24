import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    type: { type: String, enum: ['savings', 'current'] },
    holderName: String,
    number: String,
    ifscCode: String,
    bank: String,
    branch: String,
    isPrimary: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    account: { type: ObjectId, ref: 'account' },
  },
  { timestamps: true }
);

schema.index({ account: 1 });

const BankAccount = mongoose.model('bankAccount', schema);

export default BankAccount;
