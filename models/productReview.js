import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: 'product' },
    account: { type: ObjectId, ref: 'account' },
    order: { type: ObjectId, ref: 'ecomParentOrder' },
    description: { type: String },
    images: [String],
    video: [],
  },
  { timestamps: true }
);

const ProductReview = mongoose.model('productReview', schema);

export default ProductReview;
