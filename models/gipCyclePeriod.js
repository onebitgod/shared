import mongoose from 'mongoose';

export const GIPCyclePeriodCycle = {
  day: 'daily',
  WEEK: 'weekly',
  BI_WEEK: 'bi_weekly',
  MONTH: 'monthly',
};

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
      trim: true,
      uniqueCaseInsensitive: false,
    },

    cycle: {
      type: String,
      required: true,
      unique: false,
    },

    gracePeriod: {
      type: Number,
      required: true,
      unique: false,
    },

    maxSkipAllowed: {
      type: Number,
      default: 2,
      required: true,
    },

    maxUnpaidSkipAllowed: {
      type: Number,
      default: 1,
      required: true,
    },

    maxUnpaidInvestmentAllowed: {
      type: Number,
      default: 1,
      required: true,
    },

    lockInPeriod: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GIPCyclePeriod = mongoose.model('gipCyclePeriod', schema);

export default GIPCyclePeriod;
