import mongoose from 'mongoose';

export const PaymentStatus = {
  CREATED: 'created',
  PAID: 'paid',
  REFUNDED: 'refunded',
};

const schema = new mongoose.Schema(
  {
    gateway: { type: String, enum: ['razorpay'], default: 'razorpay' },
    orderId: { type: String },
    paymentId: { type: String },
    amount: { type: Number },
    feeAmount: { type: Number },
    taxAmount: { type: Number },
    settledAmount: { type: Number },
    method: { type: String },
    paidAt: { type: Date },
    settledAt: { type: Date },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.CREATED,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model('payment', schema);

export default Payment;
