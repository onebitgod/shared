import mongoose from "mongoose";
import Unit from "./unit.js";
import Metal from "./metal.js";
import { ObjectId } from "../constants.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "adminUser",
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });
// schema.index({ shortName: 1 });

const AdminDepartment = mongoose.model("adminDepartment", schema);

export default AdminDepartment;
