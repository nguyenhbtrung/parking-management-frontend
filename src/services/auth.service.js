import { ACCESS_TOKEN_KEY_NAME } from "../appConst";
import api from "./api/axios.customize";

const url = '/api/auth';

export const login = (data) => api.post(url + "/login", data);

export const register = (data) => api.post(url + "/register", data);

export const saveAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY_NAME); 