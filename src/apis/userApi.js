import { userAxios } from './index';

const userApi = {
  getAll: (params) => {
    const url = 'api/user';
    return userAxios.get(url, { params });
  },
  get: (id) => {
    const url = `api/user/id/${id}`;
    return userAxios.get(url);
  },
  getByEmail: (email) => {
    const url = `api/user/email`;
    return userAxios.get(url, email);
  },
  register: (body) => {
    const url = 'api/user/register';
    return userAxios.post(url, body);
  },
  login: (body) => {
    const url = 'api/user/login';
    return userAxios.post(url, body);
  },
  update: (id) => {
    const url = `api/user/${id}`;
    return userAxios.put(url);
  },
};

export default userApi;
