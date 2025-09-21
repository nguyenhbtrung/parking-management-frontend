import api from "../api/axios.customize";

const url = '/api/admin/parkingSlots';

export const getParkingSlots = () => api.get(url + "/");

export const checkIn = (slotId, payload) => api.post(url + `/checkIn/${slotId}`, payload);

export const checkOut = (slotId) => api.post(url + `/checkOut/${slotId}`);

export const cancelBooking = (slotId) => api.post(url + `/cancel/${slotId}`);