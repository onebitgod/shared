import { getS3Url } from 'shared/index.js';
import mongoose, { Mongoose } from 'mongoose';
import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';

export const DocumentName = {
  CERTIFICATE_OF_INCORPORATION: 'certificate_of_incorporation',
  PARTNERSHIP_DEED: 'partnership_deed',
  GST_CERTIFICATE: 'gst_certificate',
  HUF_DEED: 'huf_deed',
  OWNER_PAN: 'owner_pan',
  AGREEMENT: 'agreement',
};

export const DocumentType = {
  COMPANY_DOCUMENT: 'company_document',
  MERCHANT_AGREEMENT: 'merchant_agreement',
};

export const DocumentStatus = {
  UPLOADED: 'approved',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const schema = new mongoose.Schema(
  {
    account: {
      type: ObjectId,
      required: true,
    },
    name: { type: String, required: true, enum: getEnums(DocumentName) },
    url: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: getEnums(DocumentStatus),
      default: DocumentStatus.PENDING,
    },
    type: { type: String, enum: getEnums(DocumentType), required: true },
  },
  { timestamps: true, id: false }
);

const Document = mongoose.model('document', schema);
schema.index({ code: 1 });

export default Document;
