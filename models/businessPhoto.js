import { ObjectId } from '../constants.js';
import mongoose from 'mongoose';
import { getS3Url } from '../s3.js';

export const BusinessPhotosTypes = {
  CATALOG: 'catalog',
  INDOOR: 'indoor',
  OUTDOOR: 'outdoor',
  PRODUCT: 'product',
  OFFER: 'offer',
};
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      get: getS3Url,
      required: true,
    },
    account: { type: ObjectId, ref: 'account' },
  },
  { timestamps: true }
);

schema.index({ account: 1 });

const BusinessPhoto = mongoose.model('businessPhoto', schema);

export default BusinessPhoto;
