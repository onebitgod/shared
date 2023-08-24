import mongoose from 'mongoose';
import Metal from './metal.js';
import MetalGroup from './metalGroup.js';

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

    unit: {
      type: mongoose.Types.ObjectId,
      ref: 'unit',
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });

const ProductStyle = mongoose.model('productStyle', schema);

export default ProductStyle;
