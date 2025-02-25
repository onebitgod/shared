import mongoose from 'mongoose';
import { ObjectId } from '../../constants/db.js';
import { getEnums } from '../../utils/helpers.js';

export const CricketMatchLiveStatus = {
  PENDING: 'pending',
  LIVE: 'live',
  COMPLETED: 'completed',
};

const schema = new mongoose.Schema(
  {
    ball: Number,
    runs: Number,
    inning: Number,
    wickets: Number,

    toss: {
      team: { type: ObjectId, ref: 'cricketteam' },
      name: String,
    },
    match: {
      type: ObjectId,
      ref: 'cricketmatch',
    },
    batting: {
      type: ObjectId,
      ref: 'cricketteam',
    },
    balling: {
      type: ObjectId,
      ref: 'cricketteam',
    },
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const CricketLiveSchema = mongoose.model('cricketlive', schema);

export default CricketLiveSchema;
