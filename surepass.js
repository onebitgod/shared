import { axiosClient } from './helpers.js';

const httpRequest = async (url, body) => {
  const config = {
    headers: {
      authorization: `Bearer ${process.env.SUREPASS_TOKEN}`,
      'content-type': 'application/json',
    },
  };
  return await axiosClient().post(url, body, config);
};

export const getDinDetails = async (din) => {
  try {
    const data = await httpRequest(process.env.SUREPASS_DIN, {
      id_number: din,
    });

    return {
      ...data.data,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const verifyBankAccount = async (accountNo, ifsc) => {
  try {
    console.log(accountNo, ifsc);
    const data = await httpRequest(process.env.SUREPASS_BANK_VERIFICATION, {
      id_number: accountNo,
      ifsc: ifsc,
    });

    console.log('xxxxxxx', data);
    return {
      ...data.data,
    };
  } catch (error) {
    console.log('yyyyyyy');
    console.error(error);
    return error;
  }
};

export const sendAadhaarOtp = async (aadhaarNo) => {
  try {
    const data = await httpRequest(process.env.SUREPASS_AADHAAR_SEND_OTP, {
      id_number: aadhaarNo,
    });

    return {
      ...data.data,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const verifyAadhaar = async (clientId, otp) => {
  const data = await httpRequest(process.env.SUREPASS_AADHAAR_VERIFY_OTP, {
    client_id: clientId,
    otp: otp,
  });
  return {
    ...data.data,
  };
};

export const getGstDetails = async (gstNo) => {
  const data = await httpRequest(process.env.SUREPASS_GST_DETAILS, {
    id_number: gstNo,
    hsn_info_get: true,
  });
  return {
    ...data.data,
  };
};

export const getPanDetails = async (pan) => {
  const data = await httpRequest(process.env.SUREPASS_PAN_DETAILS, {
    id_number: pan,
  });
  console.log(JSON.stringify(data, null, 2));
  return {
    ...data.data,
  };
};

export const sendGstOtp = async (clientId) => {
  const data = await httpRequest(process.env.SUREPASS_SEND_GST_OTP, {
    client_id: clientId,
    type: 'mobile',
  });
  return {
    ...data.data,
  };
};

export const verifyGstOtp = async (clientId, otp) => {
  const data = await httpRequest(process.env.SUREPASS_VERIFY_GST_OTP, {
    client_id: clientId,
    otp: otp,
  });

  return {
    ...data.data,
  };
};
