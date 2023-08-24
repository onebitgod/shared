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
    question: {
      type: String,
      required: true,
    },
    answer: { type: String, required: true },
    category: {
      type: String,
      default: 'general',
    },
  },
  { timestamps: true, id: false }
);

schema.index({ code: 1 });

const FAQ = mongoose.model('faq', schema);

export default FAQ;
