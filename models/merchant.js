import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';
import { schemaTypes } from 'shared/index.js';
import { BGStatus } from './bankGuarantee.js';

export const CompanyType = {
  LLP: 'llp',
  PVT_LTD: 'pvt_ltd',
  PUB_LTD: 'pub_ltd',
  PARTNERSHIP: 'partnership',
  SOLE_PROPRIETORSHIPS: 'sole_proprietorship',
  HUF: 'huf',
};

export const CompanyDocumentStatus = {
  NOT_UPLOADED: 'not_uploaded',
  UPLOADED: 'uploaded',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
};

export const ModuleStatus = {
  INACTIVE: 'inactive',
  REQUESTED: 'requested',
  UNDER_PROCESS: 'under_process',
  ACTIVE: 'active',
};

export const AgreementStatus = {
  PENDING: 'pending',
  AWAITING: 'awaiting',
  SIGNED: 'signed',
};

export const commissionEcomType = {
  FIXED_RATE: 'fixed_rate',
  FIXED_PERCENTAGE: 'fixed_percentage',
  MONTHLY_FIXED_RATE: 'monthly_fixed_rate',
  MONTHLY_FIXED_PERCENTAGE: 'monthly_fixed_percentage',
  RANGE: 'ranges',
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

const moduleSettings = {
  isOpted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  bg: { type: Object, ref: 'bankGuarantee' },
  bgNotRequiredReason: { type: String },
  bgStatus: {
    type: String,
    enum: getEnums(BGStatus),
    default: BGStatus.PENDING,
  },

  agreementStatus: {
    type: String,
    enum: getEnums(AgreementStatus),
    default: AgreementStatus.PENDING,
  },
};

const schema = new mongoose.Schema(
  {
    companyName: String,
    companyType: { type: String, enum: getEnums(CompanyType) },
    merchantId: { type: String, unique: true },
    contactNo: String,

    account: { type: ObjectId, ref: 'account' },

    authorizedPerson: {
      name: String,
      dob: Date,
      mobile: String,
      designation: String,
    },

    isNdaIprSigned: {
      type: Boolean,
      default: false,
    },

    companyDocumentStatus: {
      type: String,
      enum: getEnums(CompanyDocumentStatus),
      default: CompanyDocumentStatus.NOT_UPLOADED,
    },

    hub: { ...moduleSettings, goldLimit: { type: Number, default: 0 } },

    refiner: {
      ...moduleSettings,
      commissions: {
        ranges: [ranges],
      },
    },

    verifier: {
      ...moduleSettings,
      isInStoreVerifier: {
        type: Boolean,
        default: false,
      },
      commissions: {
        flatValue: Number,
        percentageValue: Number,
        preferredValue: { type: String, enum: ['min', 'max'] },
      },
    },
    verifierRefinerGoldLimit: { type: Number, default: 0 },
    custodian: {
      ...moduleSettings,
      isLeaser: { type: Boolean, default: false },
      goldLimit: { type: Number, default: 0 },
      commissions: {
        buy: Number,
        sell: Number,
      },
    },

    leasePartner: {
      ...moduleSettings,
      leaseLimit: { type: Number, default: 0 },
      goldLimit: { type: Number, default: 0 },
    },

    retailer: {
      ...moduleSettings,
      commissions: {
        commissionType: { type: String, enum: getEnums(commissionEcomType) },
        value: { type: Number },
        ranges: [ranges],
      },
    },

    goldPriceSource: { type: ObjectId, ref: 'goldPriceSource' },

    connectedHub: { type: ObjectId, ref: 'account' },

    badla: {
      b2bBuy: { type: Number, default: 0 },
      b2bSell: { type: Number, default: 0 },
      b2cBuy: { type: Number, default: 0 },
      b2cSell: { type: Number, default: 0 },
    },
    billingState: { type: String },
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const Merchant = mongoose.model('merchant', schema);

export default Merchant;
