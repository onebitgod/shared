import mongoose, { Mongoose } from 'mongoose';

const schema = new mongoose.Schema(
  {
    data: {
      type: Map,
      of: new mongoose.Schema({
        valueType: { type: String, enum: ['percent', 'flat'] },
        value: { type: Number, required: true },
      }),
    },
  },
  { timestamps: true, id: false }
);

const GoldPriceCharges = mongoose.model('goldPriceCharge', schema);

export default GoldPriceCharges;
