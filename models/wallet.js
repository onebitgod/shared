import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

const amount = {
  hold: { type: Number, default: 0 },
  redeemable: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
};

const schema = new mongoose.Schema(
  {
    account: { type: ObjectId, ref: 'account' },
    custodian: { type: ObjectId, ref: 'account' },
    ...amount,
    modules: {
      instant: amount,
      gip: amount,
      sellReserve: amount,
      upload: amount,
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model('wallet', schema);

export default Wallet;
