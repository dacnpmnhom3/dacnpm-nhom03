import axiosClient from './index';

const productApi = {
  getAll: (params) => {
    const url = 'api/product';
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `api/produc/find/${id}`;
    return axiosClient.get(url);
  },
  recommend: (key) => {
    const url = `api/product/recommend/${key}`;
    return axiosClient.get(url);
  },
  search: (key) => {
    const url = `api/product/search/${key}`;
    return axiosClient.get(url);
  },
  put: (id, body) => {
    const url = `api/product/${id}`;
    return axiosClient.put(url, body);
  },
};

export default productApi;
