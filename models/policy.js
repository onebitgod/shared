import mongoose, { Mongoose } from 'mongoose';
import { getEnums } from '../helpers.js';
import { Application } from '../constants.js';

const schema = new mongoose.Schema(
  {
    application: {
      type: String,
      required: true,
      enum: getEnums(Application),
    },
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true, id: false }
);

const Policy = mongoose.model('policy', schema);
schema.index({ code: 1 });

export default Policy;
