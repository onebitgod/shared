import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

const location = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const schema = new mongoose.Schema(
  {
    identifier: String,
    type: String,
    line1: String,
    line2: String,
    landmark: String,
    area: String,
    city: String,
    state: String,
    postalCode: Number,
    location,
    isPrimary: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    account: { type: ObjectId, ref: 'account' },
  },
  { timestamps: true }
);

schema.index({ account: 1 });

const Address = mongoose.model('address', schema);

export default Address;
