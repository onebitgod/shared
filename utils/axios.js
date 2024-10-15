import Axios from 'axios';

const axios = Axios.create();

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const payload = {
      status: 0,
      message: error.message,
      data: error.stack,
    };

    if (error.response) {
      Object.assign(payload, {
        status: error.response.status,
        // @ts-ignore
        message: error.response.data?.message || error.response.statusText,
        data: error.response.data,
      });

      if (error.response.data && typeof error.response.data !== 'string') {
        Object.assign(payload, error.response.data);
      }
    } else {
      payload.message = error.message;
    }

    return Promise.reject(payload);
  }
);

export default axios;
