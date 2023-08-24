import mongoose from 'mongoose';
import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';

export const commissionEcomType = {
  FIXED_RATE: 'fixed_rate',
  FIXED_PERCENTAGE: 'fixed_percentage',
  MONTHLY_FIXED_RATE: 'monthly_fixed_rate',
  MONTHLY_FIXED_PERCENTAGE: 'monthly_fixed_percentage',
  RANGE: 'range',
};

const ranges = new mongoose.Schema(
  {
    min: Number,
    max: Number,
    value: Number,
    valueType: { type: String, enum: ['flat', 'percentage'] },
  },
  { _id: false, id: false }
);

const schema = new mongoose.Schema(
  {
    account: { type: ObjectId, required: true },
    custodian: {
      buy: Number,
      sell: Number,
    },
    ecom: {
      type: { type: String, enum: getEnums(commissionEcomType) },
      value: Number,
      ranges: [ranges],
    },
    verifier: {
      flatValue: Number,
      percentageValue: Number,
      preferredValue: String,
    },
    refiner: {
      ranges: [ranges],
    },
  },
  { timestamps: true }
);

const CommissionSetting = mongoose.model('commissionSetting', schema);

export default CommissionSetting;
