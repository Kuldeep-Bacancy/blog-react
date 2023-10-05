import axios from "axios";
import config from '../config/config';

const API_URL = config.backendURL

console.log(API_URL);

export const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
  }
});