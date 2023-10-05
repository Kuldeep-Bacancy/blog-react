import axios from "axios";
import config from '../config/config';


const axiosInstance = axios.create({
  baseURL: config.backendURL,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      localStorage.removeItem("token")

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axiosInstance;