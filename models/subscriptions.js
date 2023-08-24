import mongoose from 'mongoose';
import { AccountType, ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';

export const SubscriptionStatus = {
  PENDING_PAYMENT: 'pending_payment',
  EXPIRED: 'expired',
  ACTIVE: 'active',
};

const schema = new mongoose.Schema(
  {
    account: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    plan: {
      type: ObjectId,
      ref: 'subscriptionPlan',
    },
    accountType: {
      type: String,
      enum: [AccountType.CUSTOMER, AccountType.BUSINESS, AccountType.MERCHANT],
      required: true,
    },
    amount: {
      type: Number,
    },
    payment: {
      type: ObjectId,
      ref: 'razorpayPayment',
    },
    expiry: {
      type: Date,
    },
    status: {
      type: String,
      enum: getEnums(SubscriptionStatus),
      default: SubscriptionStatus.PENDING_PAYMENT,
    },
  },
  { timestamps: true, id: false }
);

const Subscription = mongoose.model('subscription', schema);

export default Subscription;
