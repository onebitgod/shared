import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

const balance = { type: Number, default: 0 };

const trackSchema = new mongoose.Schema({
  gipHold: balance,
  reserveHold: balance,
  bidBuyHold: balance,
  refund: balance,
  gipBonus: balance,
  referralBonus: balance,
});

const schema = new mongoose.Schema(
  {
    account: { type: ObjectId, ref: 'account' },
    total: trackSchema,
    custodians: { type: Map, of: trackSchema },
  },
  { timestamps: true }
);

const WalletTrack = mongoose.model('walletTrack', schema);

export default WalletTrack;
