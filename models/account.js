import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';
import { schemaTypes } from 'shared/index.js';

export const businessNature = {
  JEWELLERY: 'jewellery',
  COMMODITY: 'commodity',
};

export const settlementType = {
  INSTANT_BY_TOKEN: 'instant_by_token',
  INSTANT_BY_CASH: 'instant_by_cash',
  DAY_END_BY_TOKEN: 'day_end_by_token',
  DAY_END_BY_CASH: 'day_end_by_cash',
};

export const AccountModule = {
  CUSTODIAN: 'custodian',
  VERIFIER: 'verifier',
  REFINER: 'refiner',
  ECOM: 'ecom',
};

export const LeaseAgreementStatus = {
  PENDING: 'pending',
  AGREED: 'agreed',
};

const schema = new mongoose.Schema(
  {
    name: String,
    type: String,
    mobile: String,
    dob: Date,
    contactNo: String,
    gpi: { type: String, unique: true },
    companyType: { type: String },
    businessNature: {
      type: String,
      enums: getEnums(businessNature),
      default: businessNature.JEWELLERY,
    },
    email: String,
    pan: String,
    image: schemaTypes.S3,
    gstNo: String,
    fcmToken: String,
    state: String,
    ownerDetails: { name: String, dob: Date },
    address: Object,
    user: {
      type: ObjectId,
      ref: 'user',
    },
    location: new mongoose.Schema({
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    }),
    crn: { type: String },
    isIndividualBusiness: {
      type: Boolean,
      default: false,
    },
    isHub: {
      type: Boolean,
      default: false,
    },
    isInStoreVerifier: {
      type: Boolean,
      default: false,
    },
    isPrivacyAccepted: {
      type: Boolean,
      default: false,
    },
    verificationChecks: {
      isVerified: { type: Boolean, default: false },
      isPanVerified: { type: Boolean, default: false },
      isAadhaarVerified: { type: Boolean, default: false },
      isEmailVerified: { type: Boolean, default: false },
      isGstVerified: { type: Boolean, default: false },
      isProfileCreated: { type: Boolean, default: false },
    },
    custodian: { type: ObjectId, ref: 'account' },
    billingAddress: { type: Object },
    language: { type: String },
    isLeaseEnabled: { type: Boolean, default: false },
    leaseAgreementStatus: {
      instant: {
        type: String,
        enum: getEnums(LeaseAgreementStatus),
        default: LeaseAgreementStatus.PENDING,
      },
      gip: {
        type: String,
        enum: getEnums(LeaseAgreementStatus),
        default: LeaseAgreementStatus.PENDING,
      },
      upload: {
        type: String,
        enum: getEnums(LeaseAgreementStatus),
        default: LeaseAgreementStatus.PENDING,
      },
    },
    settlementType: {
      type: String,
      enum: getEnums(settlementType),
      default: settlementType.DAY_END_BY_CASH,
    },
    userIdMap: {
      mmtc: String,
      safegold: String,
    },
  },
  { timestamps: true, id: false }
);

schema.index({ name: 1 });
schema.index({ user: 1 });
schema.index({ location: '2dsphere' });

const Account = mongoose.model('account', schema);

export default Account;
