import mongoose from 'mongoose';
import { ObjectId } from '../constants/db.js';
import { getEnums } from '../utils/helpers.js';

const metaSchema = new mongoose.Schema({});

const schema = new mongoose.Schema(
  {
    username: { type: String, lowercase: true },

    ethereumAddress: {
      type: String,
      unique: true,
      lowercase: true,
    },

    referralCode: {
      type: String,
    },

    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    discord: { type: String },
    telegram: { type: String },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    meta: {
      type: metaSchema,
      default: {},
    },
  },
  { timestamps: true, id: false }
);

schema.index({ username: 1 });
schema.index({ ethereumAddress: 1 });

const AccountSchema = mongoose.model('account', schema);

export default AccountSchema;
