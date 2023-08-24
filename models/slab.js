import mongoose from 'mongoose';

export const SlabName = {
  GPI_CUSTOMER_BUSINESS: 'gpi_customer_business',
  GPI_BUSINESS_BUSINESS: 'gpi_business_business',
  SELL_RESERVE_INTEREST: 'sell_reserve_interest',
  INSTANT_GOLD_INTEREST: 'instant_gold_interest',
  GPI_GOLD_INTEREST: 'gip_gold_interest',
  UPLOAD_GOLD_INTEREST: 'upload_gold_interest',
};

export const SlabValueType = {
  FIXED: 'fixed',
  PERCENTAGE: 'percentage',
};

const schema = new mongoose.Schema(
  {
    name: { type: String, enum: Object.values(SlabName) },
    ranges: [
      new mongoose.Schema(
        {
          min: Number,
          max: Number,
          value: Number,
          valueType: {
            type: String,
            enum: [SlabValueType.FIXED, SlabValueType.PERCENTAGE],
          },
        },
        { _id: false, id: false }
      ),
    ],
  },
  { timestamps: true }
);

const Slab = mongoose.model('slab', schema);

export default Slab;
