import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    identifier: String,
    type: { type: String },
    data: { type: Object },
  },
  { timestamps: true }
);

const Meta = mongoose.model('meta', schema);

export default Meta;
