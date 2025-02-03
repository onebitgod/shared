import mongoose from 'mongoose';
import { ObjectId } from '../constants/db.js';
import { getEnums } from '../utils/helpers.js';
import { tokenSchema } from './token.js';
import { type } from 'os';

const schema = new mongoose.Schema(
  {
    chainType: { type: String, required: true },
    coin: { type: String, required: true },
    chainId: { type: Number, required: true, unique: true },
    key: { type: String, required: true, unique: true },
    logoUri: { type: String, required: true },
    mainnet: { type: Boolean, required: true },
    chainName: { type: String, required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    nativeToken: {
      type: ObjectId,
      ref: 'token',
      required: true,
    },
  },
  { timestamps: true, id: false }
);

schema.index({ chainId: 1 });
schema.index({ key: 1 });

const ChainSchema = mongoose.model('chain', schema);

export default ChainSchema;
