import joi from 'joi';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { PAYMENT_GATEWAY, PHONEPE_PAY_MODE } from './constants.js';

const validators = {
  objectId: () =>
    joi
      .string()
      .custom((value, helpers) => {
        if (mongoose.isObjectIdOrHexString(value) === false) {
          return helpers.error('objectId');
        }

        return value;
      })
      .messages({
        objectId: '{{#label}} must be a valid ObjectId',
      }),
  otp: () => joi.string().length(4),
  mpin: () => joi.string().length(4),
  date: () =>
    joi
      .string()
      .custom((value, helpers) => {
        const date = dayjs(value, 'DD/MM/YYYY');
        if (!date.isValid()) return helpers.error('dateFormat');

        return date.toDate();
      })
      .messages({
        dateFormat: '{{#label}} must be in `DD/MM/YYYY` format',
      }),
  payment: (allowed = Object.values(PAYMENT_GATEWAY)) => {
    return joi.object({
      gateway: joi
        .string()
        .valid(...allowed)
        .required(),
      mode: joi
        .string()
        .valid(...Object.values(PHONEPE_PAY_MODE))
        .when('gateway', {
          is: PAYMENT_GATEWAY.PHONEPE,
          then: joi.required(),
          otherwise: joi.optional().allow(''),
        }),
      instrument: joi.alternatives().conditional(joi.ref('mode'), {
        switch: [
          {
            is: PHONEPE_PAY_MODE.UPI_INTENT,
            then: joi.required(),
          },
        ],
      }),
      x: joi.object({
        deviceOs: joi.string().valid('android', 'ios'),
        targetApp: joi.string().valid('phonepe', 'paytm', 'gpay'),
        vpa: joi.string(),
        saveCard: joi.boolean(),
        cardNumber: joi.string().creditCard(),
        cardHolderName: joi.string(),
        cardExpiryMonth: joi
          .string()
          .length(2)
          .regex(/^(0[1-9]|1[0-2])$/),
        cardExpiryYear: joi
          .string()
          .length(4)
          .regex(/^\d{4}$/)
          .length(4),
        cardCvv: joi.string().length(3),
        bankId: joi.string(),
      }),
    });
  },
};

console.log(
  validators.payment().validate({
    gateway: 'phonepe',
    mode: 'upi_qr',
  })
);

export default validators;
