import api from "../api/axios.customize";

const url = '/api/admin/parkingRecords';

export const getParkingRecords = (params) => api.get(url + "/", { params });
