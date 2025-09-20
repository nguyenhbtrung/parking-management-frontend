import api from "../api/axios.customize";

const url = '/api/admin/parkingSlots';

export const getParkingSlots = () => api.get(url + "/");