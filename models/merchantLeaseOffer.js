import mongoose from "mongoose";
import Unit from "./unit.js";
import Metal from "./metal.js";
import { ObjectId } from "../constants.js";
import { getEnums } from "../helpers.js";

export const MerchantLeaseOfferStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

const schema = new mongoose.Schema(
  {
    custodian: {
      type: ObjectId,
      ref: "merchant",
      required: true,
    },
    leasePartner: {
      type: ObjectId,
      ref: "merchant",
      required: true,
    },
    interestOffered: {
      type: Number,
      required: true,
    },
    goldOffered: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: getEnums(MerchantLeaseOfferStatus),
      default: MerchantLeaseOfferStatus.PENDING,
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });
// schema.index({ shortName: 1 });

const MerchantLeaseOffer = mongoose.model("merchantLeaseOffer", schema);

export default MerchantLeaseOffer;
