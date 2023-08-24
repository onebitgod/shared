import { ObjectId } from '../constants.js';
import cryptoRandomString from 'crypto-random-string';
import { getEnums } from '../helpers.js';
import { getS3Url } from '../s3.js';
import mongoose from 'mongoose';

export const EcomOrderStatus = {
  PENDING_PAYMENT: 'pending_payment',
  PLACED: 'placed',
  ASSIGNED: 'assigned',
  PACKED: 'packed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURN_INITIATED: 'return_initiated',
  RETURNED: 'returned',
};

export const EcomOrderProductStatus = {
  PLACED: 'placed',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURN_INITIATED: 'return_initiated',
  RETURNED: 'returned',
};

const schema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
      unique: true,
      default: () =>
        cryptoRandomString({
          type: 'numeric',
          length: 8,
        }),
    },
    merchant: {
      type: ObjectId,
      ref: 'account',
    },
    customer: {
      type: ObjectId,
      ref: 'account',
    },
    address: {
      type: ObjectId,
      ref: 'address',
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
    invoice: {
      type: ObjectId,
    },
    goldRate: {
      type: Number,
      required: true,
    },
    shippingCharge: {
      type: Number,
      default: 0,
    },
    items: [
      new mongoose.Schema(
        {
          product: { type: ObjectId, ref: 'product' },
          name: String,
          image: { type: String },
          quantity: Number,
          tax: Number,
          taxAmount: Number,
          grossAmount: Number,
          amount: Number,
          rate: Number,
          returnedAt: { type: Date },
          returnedInitiatedAt: { type: Date },
          cancelledAt: { type: Date },
          offer: ObjectId,
          isHandedOver: { type: Boolean, default: false },
          handedOverAt: { type: Date },
          beforeHandOver: {
            quantity: Number,
            weight: Number,
            weighingScaleImage: String,
            isReviewed: { type: Boolean, default: false },
          },
          afterHandOver: {
            quantity: Number,
            weight: Number,
            weighingScaleImage: String,
            isReviewed: { type: Boolean, default: false },
          },
          status: {
            type: String,
            default: EcomOrderProductStatus.PLACED,
            enum: getEnums(EcomOrderStatus),
          },
        },
        { id: false, _id: false }
      ),
    ],

    shippingDetails: {
      docketNo: { type: String },
      brnNo: { type: String },
      estimatedDeliveryDate: { type: Date },
      trackingUrl: { type: String },
      manager: { type: ObjectId, ref: 'merchantUser' },
      captain: { type: ObjectId, ref: 'merchantUser' },
      invoiceImage: { type: String },
      packageImage: { type: String },
      openingVideo: { type: String },
      agentName: { type: String },
      agentImage: { type: String },
      agentSignatureImage: { type: String },
    },

    returnOrder: { type: ObjectId },

    estimatedDeliveryDate: {
      type: Date,
    },

    assignedAt: { type: Date },

    packedAt: { type: Date },

    shippedAt: { type: Date },

    canceledAt: { type: Date },

    returnedInitiatedAt: { type: Date },

    handedOverAt: { type: Date },

    deliveredAt: { type: Date },

    cancelledAt: { type: Date },

    returnedAt: { type: Date },

    status: {
      type: String,
      enum: getEnums(EcomOrderStatus),
      default: EcomOrderStatus.PENDING_PAYMENT,
    },
  },
  { timestamps: true, id: false }
);

schema.index({ customer: 1, status: 1 });
schema.index({ merchant: 1, status: 1 });
schema.index({ 'shippingDetails.manager': 1, status: 1 });
schema.index({ 'shippingDetails.captain': 1, status: 1 });

const EcomOrder = mongoose.model('ecomOrder', schema);

export default EcomOrder;
