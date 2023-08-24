import mongoose from 'mongoose';
import { getS3Url } from '../s3.js';

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
    image: {
      type: String,
      required: true,
      get: getS3Url,
    },
  },
  {
    timestamps: true,
    id: false,
  }
);
schema.index({ name: 1 });

const ProductCategories = mongoose.model('productCategories', schema);

export default ProductCategories;
