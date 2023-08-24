import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    value: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
    },
    comparison: {
      type: String,
      enum: ['more', 'less'],
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });

const Variable = mongoose.model('variable', schema);

export default Variable;
