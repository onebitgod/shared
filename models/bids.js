import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auctions',
      required: true,
    },
    bidders: [
      {
        bidder: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        bidAmount: {
          type: Number,
          required: true,
        },
      },
    ],
    sellerCounterOffer: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

var Bids = mongoose.model('Bids', schema);

export default Bids;
