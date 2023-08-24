import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import { getS3Url } from 'shared/index.js';
import mongoose from 'mongoose';

export const AppointmentType = {
  SELL: 'sell',
  UPLOAD: 'upload',
};

export const AppointmentStatus = {
  PENDING_PAYMENT: 'pending_payment',
  REQUESTED: 'requested',
  RESCHEDULE_REQUESTED: 'reschedule_requested',
  SCHEDULED: 'scheduled',
  ASSIGNED: 'assigned',
  STARTED: 'started',
  REACHED: 'reached',
  MELTED: 'melted',
  VERIFIED: 'verified',
  CANCELLED: 'cancelled',
};

export const AppointmentCancelledStage = {
  BEFORE_VERIFICATION: 'before_verification',
  BEFORE_MELTING: 'before_melting',
  AFTER_MELTING: 'after_melting',
};

const schema = new mongoose.Schema(
  {
    type: { type: String, enum: getEnums(AppointmentType) },
    approxWeight: Number,
    metalCarat: Number,
    preferredDateTime: Date,
    rescheduledDateTime: Date,
    scheduledDateTime: Date,
    visitingCharge: Number,
    facilityCharge: Number,
    amount: Number,
    tax: Number,
    taxAmount: Number,
    totalAmount: Number,
    paymentLink: {
      id: String,
      url: String,
    },
    isInStore: { type: Boolean, default: false },
    isPaymentMade: { type: Boolean, default: false },
    isOtpVerified: { type: Boolean, default: false },
    isUserApprovedBeforeMelt: { type: Boolean, default: false },
    isUserApprovedAfterMelt: { type: Boolean, default: false },
    isUserApprovedSeal: { type: Boolean, default: false },
    isUserApprovedReturnItems: { type: Boolean, default: false },
    isUserRejected: { type: Boolean, default: false },
    sellRate: Number,
    sellAmount: Number,
    isDeclared: { type: Boolean, default: false },
    declarationTax: Number,
    declarationWeight: Number,
    uploadWeight: Number,
    netWeight: Number,
    netPurity: Number,
    weighingScaleImage: { type: String, get: getS3Url },
    purityScaleImage: { type: String, get: getS3Url },
    bagWeight: Number,
    bagBarCode: String,
    bagQR: String,
    bagWeighingScaleImage: { type: String, get: getS3Url },
    sealingVideo: { type: String, get: getS3Url },
    metalGroup: { type: ObjectId, ref: 'metalGroup' },
    address: { type: ObjectId, ref: 'address' },
    payment: { type: ObjectId, ref: 'razorpayPayment' },
    account: { type: ObjectId, ref: 'account' },
    bankAccount: { type: ObjectId, ref: 'bankAccount' },
    invoice: { type: ObjectId, ref: 'invoice' },
    verifier: {
      merchant: { type: ObjectId, ref: 'account' },
      manager: { type: ObjectId, ref: 'merchantUser' },
      captain: { type: ObjectId, ref: 'merchantUser' },
      vehicle: { type: ObjectId, ref: 'vehicle' },
      securityGuards: [String],
      isSubmitted: { type: Boolean, default: false },
    },
    items: [
      new mongoose.Schema({
        name: String,
        grossWeight: Number,
        grossPurity: Number,
        netWeight: Number,
        netPurity: Number,
        image: { type: String, get: getS3Url },
        styles: [
          new mongoose.Schema({
            style: { type: ObjectId, ref: 'productStyle' },
            weight: Number,
            pieceCount: Number,
          }),
        ],
      }),
    ],
    cancelledStage: { type: String, enum: getEnums(AppointmentCancelledStage) },
    lastScheduledBy: String,
    scheduledAt: Date,
    rescheduledAt: Date,
    assignedAt: Date,
    startedAt: Date,
    reachedAt: Date,
    meltedAt: Date,
    verifiedAt: Date,
    cancelledAt: Date,
    status: {
      type: String,
      enum: [
        AppointmentStatus.PENDING_PAYMENT,
        AppointmentStatus.REQUESTED,
        AppointmentStatus.RESCHEDULE_REQUESTED,
        AppointmentStatus.SCHEDULED,
        AppointmentStatus.ASSIGNED,
        AppointmentStatus.STARTED,
        AppointmentStatus.REACHED,
        AppointmentStatus.MELTED,
        AppointmentStatus.VERIFIED,
        AppointmentStatus.CANCELLED,
      ],
      default: AppointmentStatus.PENDING_PAYMENT,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('appointment', schema);

export default Appointment;
