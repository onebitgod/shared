import mongoose from 'mongoose';
import { ObjectId } from '../../constants/db.js';
import { getEnums } from '../../utils/helpers.js';

const schema = new mongoose.Schema(
  {
    name: String,
    image: String,
    coverImage: String,
    flagImage: String,
    country: String,
  },
  { timestamps: true, id: false }
);

schema.index({ account: 1 });

const CricketTeamSchema = mongoose.model('cricketteam', schema);

export default CricketTeamSchema;
