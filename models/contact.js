import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    fullName: { type: String },
    mobile: { type: String },
    normalizedNumber: { type: String },
    hasWhatsapp: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Contact = mongoose.model('contact', schema);

export default Contact;
