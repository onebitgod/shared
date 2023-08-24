import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: false,
      uniqueCaseInsensitive: false,
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });

const Certificate = mongoose.model('certificate', schema);

export default Certificate;
