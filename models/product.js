import { count } from 'console';
import { getEnums } from '../helpers.js';
import { getS3Url } from '../s3.js';
import mongoose from 'mongoose';

export const makingChargesTypes = {
  NET_WEIGHT: 'net_weight',
  GROSS_WEIGHT: 'gross_weight',
  PER_PRICE: 'per_piece',
  FIXED: 'fixed',
  GROSS_WEIGHT_PERCENTAGE: 'gross_weight_percentage',
  NET_WEIGHT_PERCENTAGE: 'net_weight_percentage',
};

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uniqueCaseInsensitive: false,
    },
    netWeight: {
      type: Number,
      required: true,
    },
    account: {
      type: mongoose.Types.ObjectId,
      ref: 'account',
      required: true,
    },
    accountType: {
      type: String,
      enum: ['business', 'merchant'],
    },
    itemType: {
      type: mongoose.Types.ObjectId,
      ref: 'productItemType',
      required: true,
    },
    pieces: {
      type: Number,
      required: true,
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'productCategories',
      },
    ],
    collections: [
      {
        type: mongoose.Types.ObjectId, //define by user
        ref: 'collection',
      },
    ],
    varities: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'productVarities',
      },
    ],
    productTypes: [
      {
        type: mongoose.Types.ObjectId, //define by user
        ref: 'productType',
        required: true,
      },
    ],
    grossWeight: {
      type: Number,
      required: true,
    },
    metalGroup: {
      type: mongoose.Types.ObjectId,
      ref: 'metalGroup',
      required: true,
    },
    purity: {
      type: Number,
      required: true,
    },
    stockCount: {
      type: Number,
      required: true,
    },
    hsn: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'hsn',
    },
    huid: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: false,
      unique: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    purchaseCount: {
      type: Number,
      default: 0,
    },
    purityComposition: [
      {
        metalGroup: {
          type: mongoose.Types.ObjectId,
          ref: 'metalGroup',
          required: true,
        },
        purity: {
          type: Number,
          required: true,
        },
        weight: { type: Number, required: true },
      },
    ],
    totalSCWeightInGram: {
      type: Number,
      required: true,
    },
    styleComposition: [
      {
        style: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: 'productStyle',
        },
        weightInGram: {
          type: Number,
          required: true,
        },
        rate: { type: Number, required: true },
        rateAppliedOn: { type: String, enum: ['weight', 'piece'] },
        weight: { type: Number, required: true },
        pieceCount: { type: Number, required: true },
        clarity: {
          type: mongoose.Types.ObjectId,
          ref: 'clarity',
        },
        color: {
          type: mongoose.Types.ObjectId,
          ref: 'color',
        },
        cut: {
          type: mongoose.Types.ObjectId,
          ref: 'cut',
        },
        shape: {
          type: mongoose.Types.ObjectId,
          ref: 'shape',
        },
        certificate: {
          type: mongoose.Types.ObjectId,
          ref: 'certificate',
        },
      },
    ],
    makingCharges: {
      rate: {
        type: Number,
        required: true,
      },
      rateAppliedOn: {
        type: String,
        required: true,
        enum: getEnums(makingChargesTypes),
      },
    },
    isReturnable: {
      type: Boolean,
      default: false,
    },
    returnPeriod: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
        get: getS3Url,
      },
    ],
    video: {
      type: String,
      get: getS3Url,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });

const Product = mongoose.model('product', schema);

export default Product;
