import mongoose from 'mongoose';
import { AccountType } from '../constants.js';

const schema = new mongoose.Schema(
  {
    applicationType: {
      type: String,
      enum: [AccountType.CUSTOMER, AccountType.BUSINESS, AccountType.MERCHANT],
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    benefitPoints: [String],
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, id: false }
);

const SubscriptionPlan = mongoose.model('subscriptionPlan', schema);

export default SubscriptionPlan;
