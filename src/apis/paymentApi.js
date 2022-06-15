import {axiosClient} from './index';

const paymentApi = {
  payment: (body) => {
    const url = 'api/order/payment';
    return axiosClient.post(url, body);
  },
};

export default paymentApi;
