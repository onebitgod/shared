import mongoose from 'mongoose';
import { ObjectId } from '../../constants/db.js';
import { getEnums } from '../../utils/helpers.js';

export const CricketMatchStatus = {
  PENDING: 'pending',
  LIVE: 'live',
  COMPLETED: 'completed',
};

const schema = new mongoose.Schema(
  {
    name: String,
    image: String,
    coverImage: String,

    place: String,

    type: {
      type: String,
    },

    startDate: Date,
    endDate: Date,

    teams: [
      {
        team: { type: ObjectId, ref: 'cricketteam' },
        name: String,
      },
    ],

    status: {
      type: String,
      enum: getEnums(CricketMatchStatus),
      default: CricketMatchStatus.PENDING,
    },
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const CricketMatchSchema = mongoose.model('cricketmatch', schema);

export default CricketMatchSchema;
