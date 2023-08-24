import mongoose from 'mongoose';
import Unit from './unit.js';
import Metal from './metal.js';
import { ObjectId } from '../constants.js';
import { getS3Url } from '../s3.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: false,
    },
    tier: {
      type: Number,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    isTempPass: {
      type: Boolean,
      default: true,
    },
    twoFaSecret: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      get: getS3Url,
    },
    createdBy: {
      type: ObjectId,
      ref: 'adminUser',
    },
    department: {
      type: ObjectId,
      ref: 'adminDepartment',
    },
    role: {
      type: ObjectId,
      ref: 'adminRole',
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });
// schema.index({ shortName: 1 });

const AdminUser = mongoose.model('adminUser', schema);

export default AdminUser;
