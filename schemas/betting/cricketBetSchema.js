import mongoose from 'mongoose';
import { ObjectId } from 'shared/constants/db.js';
import { getEnums } from 'shared/utils/helpers.js';

export const BetType = {
  WIN: 'win',
  LOOSE: 'loose',
  RUN: 'run',
  WICKET: 'wicket',
  BOUNDARY: 'boundary',
};

const schema = new mongoose.Schema(
  {
    account: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    type: {
      type: String,
      enum: getEnums(BetType),
    },
    bet: {
      type: ObjectId,
      ref: 'bet',
    },
    over: Number,
    ball: Number,
  },
  { timestamps: true, id: false }
);

schema.index({ bet: 1 });
schema.index({ account: 1 });

const CricketBetSchema = mongoose.model('cricketBet', schema);

export default CricketBetSchema;
