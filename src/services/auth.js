import axios from "axios";
import config from '../config/config';
import authHeader from "./authHeader";

const API_URL = config.backendURL

const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/signup`, {
    user: {
      email: email,
      password: password,
    }
  });

  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    user: {
      email: email,
      password: password
    }
  });
  
  return response.data;
};

const logout = async () => {
  const response = await axios.delete(`${API_URL}/logout`, { headers: authHeader() });

  if (response.data.status_code === 200){
    localStorage.removeItem("token");
  }

  return response.data;
}


const authService = { register, login, logout }

export default authService
