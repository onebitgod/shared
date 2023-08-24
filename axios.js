import Axios from 'axios';

const axios = Axios.create();

axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const payload = {};

        if (error.response) {
            Object.assign({
                status: error.response.status,
                // @ts-ignore
                message: error.response.data?.message || error.response.statusText,
            });

            if (error.response.data && typeof error.response.data !== 'string') {
                Object.assign(payload, error.response.data);
            }

            return Promise.reject(payload);
        } else {
            throw error;
        }
    }
);

export default axios;
