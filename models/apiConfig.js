import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    custodians: Object,
  },
  { timestamps: true }
);

const APIConfig = mongoose.model('apiConfig', schema);

export default APIConfig;
