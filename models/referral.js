import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const ReferralType = {
  BASIC: 'basic',
  VIP: 'vip',
  INFLUENCER: 'influencer',
  PROMOTIONAL: 'promotional',
};

export const ReferralConditionCriteria = {
  DOWNLOAD: 'download',
  WEIGHT_PLAN: 'weight_plan',
  VALUE_PLAN: 'value_plan',
};

export const ReferralConditionValueType = {
  TOKENS: 'tokens',
  FIXED_AMOUNT: 'fixed_amount',
  GIP_PERCENTAGE: 'gip_percentage',
};

export const ReferralConditionCreditOn = {
  IMMEDIATE: 'immediate',
  MATURITY: 'maturity',
};

export const ReferralConditionRedeemableOn = {
  IMMEDIATE: 'immediate',
  MATURITY: 'maturity',
  DURATION: 'duration',
};

export const referralCondition = new mongoose.Schema(
  {
    criteria: { type: String, enum: getEnums(ReferralConditionCriteria) },
    valueType: { type: String, enum: getEnums(ReferralConditionValueType) },
    creditOn: { type: String, enum: getEnums(ReferralConditionCreditOn) },
    redeemableOn: {
      type: String,
      enum: getEnums(ReferralConditionRedeemableOn),
    },
    value: { type: Number, default: 0 },
    minPlanValue: { type: Number, default: 0 },
    minPlanDuration: { type: Number, default: 0 },
    redeemableDuration: { type: Number, default: 0 },
    maturityJoiningBonus: { type: Number, default: 0 },
    maturityReferralBonus: { type: Number, default: 0 },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    name: { type: String },
    mobile: { type: String },
    email: { type: String },
    type: { type: String, enum: getEnums(ReferralType) },
    code: { type: String, unique: true },
    account: { type: ObjectId, ref: 'account' },
    admin: { type: ObjectId, ref: 'admin' },
    condition: referralCondition,
    tokens: { type: Number, default: 0 },
    referredCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

schema.index({ account: 1 });

const Referral = mongoose.model('referral', schema);

export default Referral;
