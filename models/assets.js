import mongoose from 'mongoose';
import { AccountType, getEnums } from '../index.js';

export const AssetsType = {
  ECOM_BANNER: 'ecom_banner',
  LOGO: 'logo',
};

const schema = new mongoose.Schema(
  {
    application: { type: String, enum: getEnums(AccountType) },
    assetType: { type: String, enum: getEnums(AssetsType) },
    url: { type: String },
  },
  { timestamps: true }
);

const Asset = mongoose.model('asset', schema);

export default Asset;
