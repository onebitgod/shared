import mongoose from 'mongoose';
import { getEnums } from '../helpers.js';

export const GoldPriceSourceType = {
  HTTP: 'http',
  SOCKET: 'socket',
  WS: 'ws',
};

const schema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    type: { type: String, enum: getEnums(GoldPriceSourceType) },
    request: {
      method: String,
      url: String,
      headers: Object,
      body: Object,
      options: Object,
      interval: Number,
    },
    response: {
      fn: String,
      eventName: String,
    },
    isDefault: { type: Boolean, default: false },
    isEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const GoldPriceSource = mongoose.model('goldPriceSource', schema);

export default GoldPriceSource;
