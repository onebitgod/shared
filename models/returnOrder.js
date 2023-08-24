import { ObjectId } from '../constants.js';
import cryptoRandomString from 'crypto-random-string';
import { getEnums } from '../helpers.js';
import { getS3Url } from '../s3.js';
import mongoose from 'mongoose';

export const ReturnOrderStatus = {
  PLACED: 'placed',
  RECEIVED: 'received',
  ASSIGNED: 'assigned',
  CHECKED: 'checked',
  COMPLETED: 'completed',
};

export const ReturnOrderProductStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

const schema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
      unique: true,
      default: cryptoRandomString({
        type: 'numeric',
        length: 8,
      }),
    },
    merchant: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    customer: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    address: {
      type: ObjectId,
      ref: 'address',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    parentOrder: {
      type: ObjectId,
      required: true,
      ref: 'ecomParentOrder',
    },
    ecomOrder: {
      type: ObjectId,
      ref: 'ecomOrder',
    },
    goldRate: {
      type: Number,
      required: true,
    },
    items: [
      new mongoose.Schema(
        {
          product: { type: ObjectId, ref: 'product' },
          name: String,
          image: { type: String, get: getS3Url },
          offer: ObjectId,
          rate: Number,
          quantity: Number,
          amount: Number,
          tax: Number,
          taxAmount: Number,
          grossAmount: Number,
          rejectedReason: String,
          checkingVideo: { type: String },
          checkedAt: { type: Date },
          refundedAt: { type: Date },
          refundStatus: { type: String, default: 'pending' },
          returnedReason: { type: String },
          media: [String],
          status: {
            type: String,
            default: ReturnOrderProductStatus.PENDING,
            enum: getEnums(ReturnOrderProductStatus),
          },
        },
        { id: false, _id: false }
      ),
    ],

    estimatedDeliveryDate: {
      type: Date,
    },

    shippingDetails: {
      docketNo: { type: String },
      brnNo: { type: String },
      estimatedDeliveryDate: { type: Date },
      trackingUrl: { type: String },
      manager: { type: ObjectId, ref: 'merchantUser' },
      captain: { type: ObjectId, ref: 'merchantUser' },
      packageImage: { type: String },
      openingVideo: { type: String },
    },

    isHandedOver: { type: Boolean, default: false },

    returnOrder: { type: ObjectId, ref: 'ecomOrder' },

    assignedAt: { type: Date },

    pickedAt: { type: Date },

    receivedAt: { type: Date },

    checkedAt: { type: Date },

    handedOverAt: { type: Date },

    completedAt: { type: Date },

    status: {
      type: String,
      enum: getEnums(ReturnOrderStatus),
      default: ReturnOrderStatus.PENDING_PAYMENT,
    },
  },
  { timestamps: true, id: false }
);

const ReturnOrder = mongoose.model('returnOrder', schema);

schema.index({ code: 1 });

export default ReturnOrder;
