import { ModuleName, ObjectId } from '../constants.js';
import mongoose, { Mongoose } from 'mongoose';

import { getEnums } from '../helpers.js';

export const WalletTransactionType = {
  CREDIT: 'credit',
  DEBIT: 'debit',
};

const schema = new mongoose.Schema(
  {
    moduleName: {
      type: String,
      required: true,
      enum: getEnums(ModuleName),
    },
    transactionType: {
      type: String,
      required: true,
      enum: getEnums(WalletTransactionType),
    },
    order: {
      type: ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    account: {
      type: ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

const CashWalletTransaction = mongoose.model('cashWalletTransaction', schema);

export default CashWalletTransaction;
