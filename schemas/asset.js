import mongoose from 'mongoose';
import { ObjectId } from 'shared/constants/db.js';
import { getEnums } from 'shared/utils/helpers.js';
import { tokenSchema } from './token.js';
import { type } from 'os';

export const AssetType = {
  NFT: 'nft',
  TOKEN: 'token',
};

const schema = new mongoose.Schema(
  {
    account: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    type: {
      type: String,
      enum: getEnums(AssetType),
      default: AssetType.TOKEN,
    },
    token: {
      type: ObjectId,
      ref: 'token',
    },
    nft: {
      type: ObjectId,
    },
    chain: {
      type: ObjectId,
      ref: 'chain',
    },
  },
  { timestamps: true, id: false }
);

schema.index({ token: 1 });
schema.index({ account: 1 });

const AssetSchema = mongoose.model('asset', schema);

export default AssetSchema;
