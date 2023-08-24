import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';
import Merchant from './merchant.js';

const MerchantLeaseContractStatus = {
  CANCELLED: 'cancelled',
  IN_PROCESS: 'in_process',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
};

const schema = new mongoose.Schema(
  {
    custodian: { type: ObjectId, ref: 'account' },
    leasePartner: { type: ObjectId, ref: 'account' },
    gold: { type: Number, default: 0 },
    interest: { type: Number, default: 0 },
    status: { type: String, default: MerchantLeaseContractStatus.IN_PROCESS },
  },
  { timestamps: true }
);

const MerchantLeaseContract = mongoose.model('merchantLeaseContract', schema);

export default MerchantLeaseContract;
