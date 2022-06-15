import axios from 'axios';
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    throw error;
  },
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    throw error;
  },
);

const userAxios = axios.create({
  baseURL: process.env.REACT_USER_SERVER_URL2,
});

userAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    throw error;
  },
);

export { axiosClient, userAxios };
