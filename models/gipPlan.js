import { ObjectId, ValueMode } from '../constants.js';
import mongoose from 'mongoose';
import { getEnums } from '../helpers.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: false,
      trim: true,
      uniqueCaseInsensitive: false,
    },

    mode: {
      type: String,
      enum: getEnums(ValueMode),
      required: true,
      unique: false,
      lowercase: true,
      trim: true,
      uniqueCaseInsensitive: true,
    },

    minValue: { type: Number, required: true },

    duration: { type: Number, required: true },

    cyclePeriod: {
      type: ObjectId,
      ref: 'gipCyclePeriod',
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ type: 1 }, { name: 'type' });
schema.index({ cyclePeriod: 1 }, { name: 'cyclePeriod' });

const GIPPlan = mongoose.model('plan', schema);

export default GIPPlan;
