import { ObjectId } from "../constants.js";
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: { type: String },
    counter: { type: Number, default: 0 },
    initials: { type: String },
    hexCounter: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SeriesCounter = mongoose.model("seriesCounter", schema);

export default SeriesCounter;
