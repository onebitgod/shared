import mongoose from 'mongoose';
import { ObjectId } from '../constants/db.js';
import { getEnums } from '../utils/helpers.js';
import { required } from 'joi';

const schema = new mongoose.Schema(
  {
    account: {
      type: ObjectId,
      required: true,
      ref: 'account',
    },
    coins: {
      total: {
        type: Number,
        default: 0,
      },
      onHold: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const WalletSchema = mongoose.model('wallet', schema);

export default WalletSchema;
