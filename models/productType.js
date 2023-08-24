import { getS3Url } from 'shared/index.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      lowercase: true,
      trim: true,
      uniqueCaseInsensitive: false,
    },
  },
  {
    timestamps: true,
  }
);
schema.index({ name: 1 });

const ProductType = mongoose.model('productType', schema);

export default ProductType;
