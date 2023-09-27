import axios from "axios";
import config from '../config/config';
import authHeader from "./authHeader";

const API_URL = config.backendURL

const register = async (email, password) => {
  return axios.post(`${API_URL}/signup`, {
    user: {
      email: email,
      password: password,
    }
  });
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    user: {
      email: email,
      password: password
    }
  });

  const data = response.data

  if (data.token){
    localStorage.setItem("token", JSON.stringify(data.token));
  }

  return data;
};

const logout = async () => {
  const response = await axios.delete(`${API_URL}/logout`, { headers: authHeader() });

  if (response.data.success_code === 200){
    localStorage.removeItem("token");
  }
}


const authService = { register, login, logout }

export default authService
