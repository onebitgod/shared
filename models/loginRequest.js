import { ObjectId } from '../constants.js';
import { getEnums } from '../helpers.js';
import mongoose from 'mongoose';

export const LoginRequestStatus = {
  PENDING: 'pending',
  VERIFIED: 'verified',
};

const schema = new mongoose.Schema({
  mobile: { type: String },
  fcm: { type: String },
  deviceId: { type: String },
  status: { type: String, default: LoginRequestStatus.PENDING },
  application: { type: String },

  expiresAt: { type: Date, expires: 11 },
});

const LoginRequest = mongoose.model('loginRequest', schema);

export default LoginRequest;
