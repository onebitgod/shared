import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    type: String,
    title: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

const Partner = mongoose.model('partner', schema);

export default Partner;
