import mongoose from 'mongoose';
import { ObjectId } from '../constants/db.js';

export const tokenSchema = new mongoose.Schema(
  {
    address: { type: String, required: true, unique: true },
    chainId: { type: Number },
    symbol: { type: String },
    decimals: { type: Number },
    name: { type: String },
    key: { type: String },
    logoUri: { type: String },
    chain: {
      type: ObjectId,
      ref: 'chain',
      required: true,
    },
  },
  { timestamps: true, id: false }
);

tokenSchema.index({ address: 1 });
tokenSchema.index({ chainId: 1 });

const TokenSchema = mongoose.model('token', tokenSchema);

export default TokenSchema;
