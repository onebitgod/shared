import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    mobile: { type: String, unique: true },
    dob: Date,
  },
  { timestamps: true }
);

schema.index({ mobile: 1 });

const User = mongoose.model('user', schema);

export default User;
