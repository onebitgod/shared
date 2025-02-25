import mongoose from 'mongoose';
import { ObjectId } from '../../constants/db.js';
import { getEnums } from '../../utils/helpers.js';

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
        team: { type: ObjectId, ref: 'team' },
        name: String,
      },
    ],
  },
  { timestamps: true, id: false }
);

schema.index({ name: 1 });

const CricketTournamentSchema = mongoose.model('crickettournament', schema);

export default CricketTournamentSchema;
