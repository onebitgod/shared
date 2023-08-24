import mongoose from 'mongoose';
import { ObjectId } from '../constants.js';

const time = {
  openTime: { type: String, default: '09:00 AM' },
  closeTime: { type: String, default: '09:00 PM' },
};

const schema = new mongoose.Schema({
  account: {
    type: ObjectId,
    ref: 'Account',
    required: true,
  },
  monday: {
    time,
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  tuesday: {
    time,
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  wednesday: {
    time,
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  thursday: {
    time,
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  friday: {
    time,
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  saturday: {
    time,
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  sunday: {
    time,
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
});

const StoreTimings = mongoose.model('storeTimings', schema);

export default StoreTimings;
