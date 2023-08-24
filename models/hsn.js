import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      uniqueCaseInsensitive: false,
    },
    description: { type: String },
    gst: { type: Number, required: true },
  },
  { timestamps: true, id: false }
);

const Hsn = mongoose.model('hsn', schema);
schema.index({ code: 1 });

export default Hsn;
