import mongoose from 'mongoose';
import Unit from './unit.js';
import Metal from './metal.js';
import { ObjectId } from '../constants.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: ObjectId,
      ref: 'adminUser',
    },
    tier: {
      type: Number,
      required: true,
    },
    department: {
      type: ObjectId,
      ref: 'adminDepartment',
    },
    description: {
      type: String,
      required: true,
    },
    permissions: [
      new mongoose.Schema(
        {
          route: String,
          actions: [
            {
              type: String,
              enum: ['read', 'write', 'update', 'delete'],
            },
          ],
        },
        { _id: false }
      ),
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });
// schema.index({ shortName: 1 });

const AdminRole = mongoose.model('adminRole', schema);

export default AdminRole;
