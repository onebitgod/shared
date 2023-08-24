import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      uniqueCaseInsensitive: false,
    },

    symbol: {
      type: String,
      unique: false,
      required: true,
    },

    conversionFactor: {
      type: Number,
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

const Unit = mongoose.model('unit', schema);
schema.index({ name: 1 });

export default Unit;
