import config from '../config/config';
import { axiosPublic } from "../common/axiosPublic.js";
import { axiosPrivate } from '../common/axiosPrivate';

const API_URL = config.backendURL

const register = async (email, password) => {
  const response = await axiosPublic.post(`${API_URL}/signup`, {
    user: {
      email: email,
      password: password,
    }
  });

  return response.data;
};

const login = async (email, password) => {
  const response = await axiosPublic.post(`${API_URL}/login`, {
    user: {
      email: email,
      password: password
    }
  });
  
  return response.data;
};

const logout = async () => {
  const response = await axiosPrivate.delete(`${API_URL}/logout`);

  if (response.data.status_code === 200){
    localStorage.removeItem("token");
  }

  return response.data;
}


const authService = { register, login, logout }

export default authService
