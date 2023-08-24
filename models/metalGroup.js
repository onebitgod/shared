import mongoose from 'mongoose';
import Unit from './unit.js';
import Metal from './metal.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
      trim: false,
      uniqueCaseInsensitive: false,
    },

    purity: {
      type: Number,
      required: true,
      unique: false,
    },

    metal: {
      type: mongoose.Types.ObjectId,
      ref: 'metal',
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

const MetalGroup = mongoose.model('metalGroup', schema);

export default MetalGroup;
