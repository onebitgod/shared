import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  buyPrice: Number,
  sellPrice: Number,
  lbmaPrice: Number,
  dollarPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

const GoldPrice = mongoose.model('goldPrice', schema);

export default GoldPrice;
