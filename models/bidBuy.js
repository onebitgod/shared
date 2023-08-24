import mongoose from 'mongoose';
import { getEnums } from '../helpers.js';

export const orderTypes = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
  ACCEPTED_BY_BIDDER: 'acceptedByBidder',
  ACCEPTED_BY_SELLER: 'acceptedBySeller',
  ACCEPTED_BY_BOTH: 'acceptedByBoth',
  PENDING_PAYMENT: 'pendingPayment',
};

export const bidTypes = {
  WAITING: 'waiting',
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  INITIAL_BID: 'initialBid',
  ACCEPTED_BY_BIDDER: 'acceptedByBidder',
  ACCEPTED_BY_SELLER: 'acceptedBySeller',
  ACCEPTED_BY_BOTH: 'acceptedByBoth',
  COUNTER_BY_SELLER: 'counterBySeller',
  COUNTER_BY_BIDDER: 'counterByBidder',
  REJECTED: 'rejected',
  COUNTER_OFFERED: 'counterOffered',
};

const schema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
      required: true,
    },
    askPerGram: {
      type: Number,
      required: true,
    },
    tokenAmount: {
      type: Number,
      required: true,
    },
    custodians: [
      {
        custodianId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'account',
          required: true,
        },
        tokens: {
          type: Number,
          required: true,
        },
      },
    ],
    grossAmount: {
      type: Number,
    },
    orderStatus: {
      type: String,
      enum: getEnums(orderTypes),
      default: orderTypes.ACTIVE,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'razorpayPayment',
    },
    expirationTime: Date,
    bids: [
      {
        bidderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'account',
        },
        bidAmount: {
          type: Number,
        },
        status: {
          type: String,
          enum: getEnums(bidTypes),
          default: bidTypes.PENDING,
        },
        counterOffer: {
          type: Number,
        },
        bidHistory: [
          {
            status: {
              type: String,
              enum: getEnums(bidTypes),
              default: bidTypes.PENDING,
            },
            amount: {
              type: Number,
            },
            bidBy: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'account',
            },
          },
        ],
        // sellerHistory: [
        //   {
        //     bidderStatus: {
        //       type: String,
        //       enum: getEnums(bidTypes),
        //       default: bidTypes.PENDING,
        //     },
        //     amount: {
        //       type: Number,
        //     },
        //   },
        // ],
      },
    ],
    bidsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Auction = mongoose.model('Auctions', schema);

export default Auction;
