import joi from 'joi';
import mongoose from 'mongoose';
import dayjs from 'dayjs';

export const validate = (schema, options = {}) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(
      // @ts-ignore
      options?.field ? req[options.field] : req.body,
      {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
        errors: {
          wrap: {
            label: '',
          },
        },
        ...options,
      }
    );

    if (error) {
      const errors = error.details.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.context?.key || 'error']: cur.message,
        }),
        { error: null }
      );
      // @ts-ignore
      errors.error = error.message;
      console.error(errors);
      return sendResponse(res, 422, 'Validation error', null, errors);
    }

    req.body = value;
    next();
  };
};

export const validators = {
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
};
