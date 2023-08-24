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
  }
);

schema.index({ name: 1 });

const Color = mongoose.model('color', schema);

export default Color;
