import mongoose from 'mongoose';
import { getEnums } from '../helpers.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    offers: [
      {
        offerType: { type: String, required: true, enum: ['flat', 'percent'] },
        discount: { type: Number, required: true },
        discountOn: {
          type: String,
          required: true,
          enum: ['making_charges', 'price'],
        },
      },
    ],

    account: { type: mongoose.Types.ObjectId, ref: 'account', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    offerAppliedOn: {
      categories: {
        type: mongoose.Types.ObjectId,
        ref: 'productCategories',
      },
      products: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'product',
        },
      ],
      varities: {
        type: mongoose.Types.ObjectId,
        ref: 'productVarities',
      },
      productStyle: { type: mongoose.Types.ObjectId, ref: 'productStyle' },
      collection: { type: mongoose.Types.ObjectId, ref: 'collection' },
      productType: { type: mongoose.Types.ObjectId, ref: 'productType' },
    },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, id: false }
);

const Offer = mongoose.model('offer', schema);
schema.index({ code: 1 });

export default Offer;
