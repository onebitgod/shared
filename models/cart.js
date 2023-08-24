import mongoose from 'mongoose';

var schema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: 'Account',
      unique: true,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        offerId: {
          type: mongoose.Types.ObjectId,
          ref: 'offer',
        },
        count: {
          type: Number,
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

var Cart = mongoose.model('Cart', schema);

export default Cart;
