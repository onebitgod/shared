import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const JustificationType = {
  CANCEL_APPOINTMENT: 'cancel_appointment',
  RETURN_ORDER: 'return_order',
  CANCEL_ORDER: 'cancel_order',
  REJECT_ITEM: 'reject_item',
  DISCLAIMER_BEFORE_MELT: 'disclaimer_before_melt',
  DISCLAIMER_AFTER_MELT: 'disclaimer_after_melt',
  DISCLAIMER_SEAL_ITEM: 'disclaimer_seal_item',
  DISCLAIMER_RETURN_ITEMS: 'disclaimer_return_items',
};

const schema = new mongoose.Schema(
  {
    type: { type: String, enum: getEnums(JustificationType) },
    description: String,
  },
  { timestamps: true }
);

const Justification = mongoose.model('justification', schema);

export default Justification;
