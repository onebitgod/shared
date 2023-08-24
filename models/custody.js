import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const CustodyType = {
  GIVEN: 'given',
  RELEASE: 'release',
  TRANSFER: 'transfer',
};

const schema = new mongoose.Schema(
  {
    type: { type: String, enum: getEnums(CustodyType) },
    account: { type: ObjectId, ref: 'account' },
    custodian: { type: ObjectId, ref: 'account' },
    transferredTo: { type: ObjectId, ref: 'account' },
    transaction: { type: ObjectId, ref: 'transaction' },
    invoice: { type: ObjectId, ref: 'invoice' },
    tokens: { type: Number },
    isUploaded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Custody = mongoose.model('custody', schema);

export default Custody;
