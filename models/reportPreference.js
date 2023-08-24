import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: { type: String },
    report: { type: String },
    application: { type: String },
    columns: [
      new mongoose.Schema(
        {
          label: String,
          value: String,
        },
        { _id: false }
      ),
    ],
    account: { type: ObjectId, ref: 'account' },
  },
  { timestamps: true }
);

schema.index({ report: 1, account: 1 });

const ReportPreference = mongoose.model('reportPreference', schema);

export default ReportPreference;
