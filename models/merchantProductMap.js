import Metal from "./metal.js";
import { ObjectId } from "../constants.js";
import Unit from "./unit.js";
import mongoose from "mongoose";

export const ProductMapType = {
  CATEGORY_MAP: "category",
  ITEM_TYPE_MAP: "item-type",
  VARIETY_MAP: "variety",
  PRODUCT_TYPE_MAP: "product-type",
  METAL_PURITY_MAP: "metal-purity",
  STYLE_MAP: "style",
  CLARITY_MAP: "clarity",
  COLOR_MAP: "color",
  CUT_MAP: "cut",
  CERTIFICATE_MAP: "certificate",
};

const schema = new mongoose.Schema(
  {
    merchant: {
      type: ObjectId,
      ref: "account",
      required: true,
    },
    categoryMap: [
      {
        category: {
          type: ObjectId,
          ref: "productCategories",
          required: true,
        },
        value: {
          type: String,
          lowercase: true,
          required: true,
        },
      },
    ],
    itemTypeMap: [
      {
        itemType: {
          type: ObjectId,
          ref: "productItemType",
          required: true,
        },
        value: {
          lowercase: true,
          type: String,
          required: true,
        },
      },
    ],
    varietyMap: [
      {
        variety: {
          type: ObjectId,
          ref: "productVarities",
          required: true,
        },
        value: {
          type: String,
          lowercase: true,
          required: true,
        },
      },
    ],
    productTypeMap: [
      {
        productType: {
          type: ObjectId,
          ref: "productType",
          required: true,
        },
        value: {
          type: String,
          lowercase: true,
          required: true,
        },
      },
    ],
    metalPurityMap: [
      {
        metalPurity: {
          type: ObjectId,
          ref: "metalGroup",
          required: true,
        },
        value: {
          type: String,
          lowercase: true,
          required: true,
        },
      },
    ],
    styleMap: [
      {
        style: {
          type: ObjectId,
          ref: "productStyle",
          required: true,
        },
        value: {
          type: String,
          lowercase: true,
          required: true,
        },
      },
    ],
    clarityMap: [
      {
        clarity: {
          type: ObjectId,
          ref: "clarity",
          required: true,
        },
        value: {
          type: String,
          lowercase: true,
          required: true,
        },
      },
    ],
    colorMap: [
      {
        color: {
          type: ObjectId,
          ref: "color",
          required: true,
        },
        value: {
          type: String,
          lowercase: true,
          required: true,
        },
      },
    ],
    cutMap: [
      {
        cut: {
          type: ObjectId,
          ref: "cut",
          required: true,
        },
        value: {
          type: String,
          lowercase: true,
          required: true,
        },
      },
    ],
    certificateMap: [
      {
        certificate: {
          type: ObjectId,
          ref: "certificate",
          required: true,
        },
        value: {
          type: String,
          lowercase: true,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    id: false,
  }
);

schema.index({ name: 1 });

const MerchantProductMap = mongoose.model("merchantProductMap", schema);

export default MerchantProductMap;
