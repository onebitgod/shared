import mongoose from 'mongoose';
import { ObjectId } from 'shared/constants/db.js';
import { getEnums } from 'shared/utils/helpers.js';
import { tokenSchema } from '../token.js';

export const BetCommissionType = {
  FIXED: 'fixed',
  PERCENTAGE: 'percentage',
};

export const BetGame = {
  CRICKET: 'cricket',
};

export const BetStatus = {
  CREATED: 'created',
  ACTIVE: 'active',
  EXPIRED: 'expired',
};

const schema = new mongoose.Schema(
  {
    account: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },

    minimumCoins: {
      type: Number,
    },
    status: {
      type: String,
      enum: getEnums(BetStatus),
      default: BetStatus.CREATED,
    },

    commission: {
      type: {
        type: String,
        enum: getEnums(BetCommissionType),
        default: BetCommissionType.FIXED,
      },
      value: {
        type: Number,
        default: 0,
      },
    },

    game: {
      type: String,
      enum: getEnums(BetGame),
      default: BetGame.CRICKET,
    },
    gameBetRefId: String,
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const BetSchema = mongoose.model('bet', schema);

export default BetSchema;
