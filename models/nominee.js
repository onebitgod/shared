import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  account: { type: ObjectId, ref: 'account' },
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  age: { type: Number },
  address: { type: String },
  relation: { type: String },
  aadhaar: { type: String },
  pan: { type: String },
});

schema.index({ account: 1 });

const Nominee = mongoose.model('nominee', schema);

export default Nominee;
