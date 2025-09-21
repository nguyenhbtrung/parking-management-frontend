// mockApi.js
// Mô phỏng API server-side với dữ liệu bạn cung cấp.
// Trả về phù hợp với params: page, limit, search, parkingRecordId, status, parkingSlotId, sortBy, sortOrder

const RAW = {
    data: [
        // (copy từ JSON bạn cung cấp)...
        { "id": 16, "licensePlate": "34E-1111", "status": "checked-in", "bookingTime": "2025-09-21T06:18:16.391Z", "checkInTime": "2025-09-21T06:18:16.391Z", "checkOutTime": null, "userId": 1, "parkingSlotId": 9, "createdAt": "2025-09-21T06:18:16.391Z", "updatedAt": "2025-09-21T06:18:16.391Z", "user": { "id": 1, "username": "a1", "name": null, "phone": null, "email": "a1@gmail.com" } },
        { "id": 15, "licensePlate": "30B-4314", "status": "booked", "bookingTime": "2025-09-21T06:09:48.946Z", "checkInTime": "2025-09-21T06:09:48.946Z", "checkOutTime": null, "userId": 1, "parkingSlotId": 18, "createdAt": "2025-09-21T06:09:48.946Z", "updatedAt": "2025-09-21T06:09:48.946Z", "user": { "id": 1, "username": "a1", "name": null, "phone": null, "email": "a1@gmail.com" } },
        { "id": 13, "licensePlate": "44A-4444", "status": "checked-in", "bookingTime": "2025-09-21T06:03:50.104Z", "checkInTime": "2025-09-21T06:03:50.104Z", "checkOutTime": null, "userId": 1, "parkingSlotId": 48, "createdAt": "2025-09-21T06:03:50.104Z", "updatedAt": "2025-09-21T06:03:50.104Z", "user": { "id": 1, "username": "a1", "name": null, "phone": null, "email": "a1@gmail.com" } },
        { "id": 12, "licensePlate": "30A-2222", "status": "checked-in", "bookingTime": "2025-09-21T06:03:24.247Z", "checkInTime": "2025-09-21T06:03:24.247Z", "checkOutTime": null, "userId": 1, "parkingSlotId": 25, "createdAt": "2025-09-21T06:03:24.247Z", "updatedAt": "2025-09-21T06:03:24.247Z", "user": { "id": 1, "username": "a1", "name": null, "phone": null, "email": "a1@gmail.com" } },
        { "id": 11, "licensePlate": "29C-1111", "status": "checked-in", "bookingTime": "2025-09-21T05:54:42.172Z", "checkInTime": "2025-09-21T05:54:42.172Z", "checkOutTime": null, "userId": 1, "parkingSlotId": 36, "createdAt": "2025-09-21T05:54:42.173Z", "updatedAt": "2025-09-21T05:54:42.173Z", "user": { "id": 1, "username": "a1", "name": null, "phone": null, "email": "a1@gmail.com" } },
        { "id": 10, "licensePlate": "34D-5433", "status": "check-out", "bookingTime": "2025-09-21T05:50:40.245Z", "checkInTime": "2025-09-21T05:50:40.245Z", "checkOutTime": "2025-09-21T06:28:34.290Z", "userId": 1, "parkingSlotId": 37, "createdAt": "2025-09-21T05:50:40.246Z", "updatedAt": "2025-09-21T06:28:34.291Z", "user": { "id": 1, "username": "a1", "name": null, "phone": null, "email": "a1@gmail.com" } },
        { "id": 9, "licensePlate": " ", "status": "cancelled", "bookingTime": "2025-09-21T05:29:25.848Z", "checkInTime": null, "checkOutTime": null, "userId": 2, "parkingSlotId": 40, "createdAt": "2025-09-21T05:29:25.848Z", "updatedAt": "2025-09-21T05:31:14.382Z", "user": { "id": 2, "username": "u1", "name": null, "phone": null, "email": "u1@gmail.com" } },
        { "id": 8, "licensePlate": "28C-5378", "status": "check-out", "bookingTime": "2025-09-21T04:36:16.267Z", "checkInTime": "2025-09-21T04:36:16.267Z", "checkOutTime": "2025-09-21T05:09:23.211Z", "userId": 1, "parkingSlotId": 44, "createdAt": "2025-09-21T04:36:16.268Z", "updatedAt": "2025-09-21T05:09:23.211Z", "user": { "id": 1, "username": "a1", "name": null, "phone": null, "email": "a1@gmail.com" } },
        { "id": 5, "licensePlate": "31C-6463", "status": "check-out", "bookingTime": "2025-09-21T04:15:57.382Z", "checkInTime": "2025-09-21T04:15:57.382Z", "checkOutTime": "2025-09-21T05:07:41.853Z", "userId": 1, "parkingSlotId": 27, "createdAt": "2025-09-21T04:15:57.382Z", "updatedAt": "2025-09-21T05:07:41.854Z", "user": { "id": 1, "username": "a1", "name": null, "phone": null, "email": "a1@gmail.com" } },
        { "id": 4, "licensePlate": "31C-2222", "status": "checked-in", "bookingTime": "2025-09-21T04:14:33.775Z", "checkInTime": "2025-09-21T04:14:33.775Z", "checkOutTime": null, "userId": 1, "parkingSlotId": 2, "createdAt": "2025-09-21T04:14:33.776Z", "updatedAt": "2025-09-21T04:14:33.776Z", "user": { "id": 1, "username": "a1", "name": null, "phone": null, "email": "a1@gmail.com" } }
    ],
    pagination: { total: 13, page: 1, limit: 10, totalPages: 2 }
};

export async function getParkingRecords({ page = 1, limit = 10, search = "", parkingRecordId, status, parkingSlotId, sortBy = "createdAt", sortOrder = "DESC" }) {
    // clone
    let rows = RAW.data.slice();

    // filter search (licensePlate)
    if (search) {
        const s = search.toLowerCase();
        rows = rows.filter(r => (r.licensePlate || "").toLowerCase().includes(s));
    }

    if (parkingRecordId) {
        rows = rows.filter(r => r.id === Number(parkingRecordId));
    }

    if (status) {
        rows = rows.filter(r => r.status === status);
    }

    if (parkingSlotId) {
        rows = rows.filter(r => r.parkingSlotId === Number(parkingSlotId));
    }

    // sort
    rows.sort((a, b) => {
        const A = a[sortBy];
        const B = b[sortBy];
        if (A == null && B == null) return 0;
        if (A == null) return sortOrder === "ASC" ? -1 : 1;
        if (B == null) return sortOrder === "ASC" ? 1 : -1;

        // if ISO date strings, compare as date
        if (typeof A === "string" && /\d{4}-\d{2}-\d{2}T/.test(A)) {
            return (new Date(A) - new Date(B)) * (sortOrder === "ASC" ? 1 : -1);
        }
        if (A < B) return sortOrder === "ASC" ? -1 : 1;
        if (A > B) return sortOrder === "ASC" ? 1 : -1;
        return 0;
    });

    const total = rows.length;
    const offset = (page - 1) * limit;
    const pageRows = rows.slice(offset, offset + limit);

    return {
        data: pageRows,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
}

// Mock action endpoints: checkIn, checkOut, cancel
export async function postAction(id, action) {
    const rec = RAW.data.find(r => r.id === Number(id));
    if (!rec) throw new Error("Record not found");
    if (action === "check-in") {
        if (rec.status !== "booked") throw new Error("Không thể check-in");
        rec.status = "checked-in";
        rec.checkInTime = new Date().toISOString();
    } else if (action === "check-out") {
        if (rec.status !== "checked-in") throw new Error("Không thể check-out");
        rec.status = "check-out";
        rec.checkOutTime = new Date().toISOString();
    } else if (action === "cancel") {
        if (rec.status === "check-out") throw new Error("Không thể huỷ");
        rec.status = "cancelled";
    }
    rec.updatedAt = new Date().toISOString();
    return { data: rec };
}
