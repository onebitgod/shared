import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      uniqueCaseInsensitive: false,
    },
    account: {
      type: mongoose.Types.ObjectId,
      ref: 'account',
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

schema.index({ name: 1 });
schema.index({ account: 1 });

const Collection = mongoose.model('collection', schema);

export default Collection;
