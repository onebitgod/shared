import mongoose from 'mongoose';
import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';

export const UploadStatus = {
  ACTIVE: 'active',
  SOLD: 'SOLD',
};

const schema = new mongoose.Schema(
  {
    account: { type: ObjectId, ref: 'account' },
    custodian: { type: ObjectId, ref: 'account' },
    tokens: Number,
    balance: Number,
    uploadedAt: Date,
    soldAt: Date,
    releaseHistory: [
      new mongoose.Schema(
        {
          tokens: Number,
          interestTokens: Number,
          createdAt: Date,
        },
        { _id: false }
      ),
    ],
    status: { type: String, enum: getEnums(UploadStatus) },
  },
  { timestamps: true }
);

const Upload = mongoose.model('upload', schema);

export default Upload;
