import api from "../api/axios.customize";
import { cancelBooking, checkIn, checkOut } from "./parkingSlot.service";

const url = '/api/admin/parkingRecords';

export const getParkingRecords = (params) => api.get(url + "/", { params });

export const postAction = async (id, action, payload = {}) => {
    if (!id || !action) throw new Error("Thiếu tham số");

    if (action === "check-in") {
        const res = await checkIn(id, payload);
        if (res.status === 200) {
            console.log(res.data.data);
            return res.data.data;
        } else {
            throw new Error("Không thể check-in");
        }
    } else if (action === "check-out") {
        const res = await checkOut(id);
        if (res.status === 200) {
            console.log(res.data.data);
            return res.data.data;
        } else {
            throw new Error("Không thể check-out");
        }
    } else if (action === "cancel") {
        const res = await cancelBooking(id);
        if (res.status === 200) {
            console.log(res.data.data);
            return res.data.data;
        } else {
            throw new Error("Không thể huỷ");
        }
    } else {
        throw new Error("Action không hợp lệ");
    }
};