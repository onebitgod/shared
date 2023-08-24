import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import { getS3Url } from '../s3.js';
import mongoose from 'mongoose';

export const VehicleStatus = {
  REQUESTED: 'requested',
  PROCESSING: 'processing',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
};

const schema = new mongoose.Schema(
  {
    regNumber: String,
    model: String,
    year: Number,
    image: { type: String, get: getS3Url },
    merchant: { type: ObjectId, ref: 'account' },
    state: { type: String },
    postalCode: { type: String },
    isDeleted: { type: Boolean, default: false },
    processedAt: { type: Date },
    deliveredAt: { type: Date },
    status: {
      type: String,
      enum: getEnums(VehicleStatus),
      default: VehicleStatus.REQUESTED,
    },
  },
  { timestamps: true }
);

schema.index({ regNumber: 1 });
schema.index({ merchant: 1 });

const Vehicle = mongoose.model('vehicle', schema);

export default Vehicle;
