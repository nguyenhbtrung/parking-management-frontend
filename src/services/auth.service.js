import { ACCESS_TOKEN_KEY_NAME } from "../appConst";

const url = '/api/auth';

export const saveAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY_NAME); 