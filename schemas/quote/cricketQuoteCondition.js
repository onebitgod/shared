import mongoose from 'mongoose';
import { ObjectId } from '../../constants/db.js';
import { getEnums } from '../../utils/helpers.js';

export const CricketQuoteConditionType = {
  WIN: 'win',
  LOOSE: 'loose',
  RUN: 'run',
  WICKET: 'wicket',
  BOUNDARY: 'boundary',
  ALL_OUT: 'all_out',
};

const schema = new mongoose.Schema(
  {
    tournament: {
      type: ObjectId,
      ref: 'crickettournament',
    },
    match: {
      type: ObjectId,
      ref: 'cricketmatch',
    },
    team: {
      type: ObjectId,
      ref: 'cricketteam',
    },

    account: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },

    type: {
      type: String,
      enum: getEnums(CricketQuoteConditionType),
    },
    quote: {
      type: ObjectId,
      ref: 'quote',
    },

    over: Number,
    ball: Number,
    run: Number,
    boundary: Number,
  },
  { timestamps: true, id: false }
);

schema.index({ bet: 1 });
schema.index({ account: 1 });

const CricketQuoteConditionSchema = mongoose.model(
  'cricketquotecondition',
  schema
);

export default CricketQuoteConditionSchema;
