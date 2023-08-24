import mongoose from 'mongoose';

export const InterestRateType = {
  RESERVE: 'reserve',
  LOAN: 'loan',
};

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [InterestRateType.RESERVE, InterestRateType.LOAN],
    },
    minMonth: Number,
    maxMonth: Number,
    value: Number,
  },
  { timestamps: true }
);

const InterestRate = mongoose.model('interestRate', schema);

export default InterestRate;
