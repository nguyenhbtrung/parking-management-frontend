import api from "../api/axios.customize";

const url = '/api/admin/users';

export const getUsers = (params) => api.get(url + "/", { params });

export const createUser = (payload) => api.post(url + "/", payload);

export const updateUser = (id, payload) => api.put(url + "/" + id, payload);

export const deleteUser = (id) => api.delete(url + "/" + id);

