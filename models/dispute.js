import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const DisputeStatus = {
  PENDING: 'pending',
  INPROGRESS: 'inprogress',
  RESOLVED: 'resolved',
};

export const DisputeStage = {
  VERIFIER: 'verifier',
  REFINER: 'refiner',
  HUB: 'hub',
};

const schema = new mongoose.Schema(
  {
    stage: { type: String, enum: getEnums(DisputeStage) },
    initiatorMerchant: { type: ObjectId, ref: 'account' },
    initiatorUser: { type: ObjectId, ref: 'merchantUser' },
    responderMerchant: { type: ObjectId, ref: 'account' },
    event: { type: String },
    eventId: { type: String },
    differenceWeight: { type: Number },
    resolvedAt: { type: Date },
    status: { type: String, enum: getEnums(DisputeStatus) },
  },
  { timestamps: true }
);

const Dispute = mongoose.model('dispute', schema);

export default Dispute;
