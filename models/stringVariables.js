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
    valueType: {
      type: String,
      required: true,
      enum: ['string'],
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

const StringVariables = mongoose.model('stringVariables', schema);

export default StringVariables;
