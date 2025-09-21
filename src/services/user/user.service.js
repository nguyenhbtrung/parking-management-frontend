import api from "../api/axios.customize";

const url = "/api/user";

export const booking = (data) => api.post(url + "/booking", data);
export const getUserProfile = () => api.get(url + "/profile");
export const getBookings = () => api.get(url + "/allBookings");
export const cancelBooking = (data) => api.put(url + "/booking", data);
export const getParkingSlotsInfo = () => api.get(url + "/parkingSlots");
