import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { drawerWidth } from "../../appConst";
import ParkingMap from "../../components/ParkingMap";
import { slotPositions } from "../../data/slotPositions";
import ParkingSlotDialog from "../../components/dialogs/ParkingSlotDialog";
import CheckInDialog from "../../components/dialogs/CheckInDialog";
import { cancelBooking, checkIn, checkOut, getParkingSlots } from "../../services/admin/parkingSlot.service";
import { toast } from "react-toastify";

// --- Mảng trạng thái 48 slot (giả lập API) ---
const slotStatesFromAPI = [
    { id: 1, status: "available", licensePlate: null, updatedAt: "2025-09-20T08:00:00Z" },
    { id: 2, status: "available", licensePlate: null, updatedAt: "2025-09-20T08:05:00Z" },
    { id: 3, status: "available", licensePlate: null, updatedAt: "2025-09-20T08:10:00Z" },
    { id: 4, status: "available", licensePlate: null, updatedAt: "2025-09-20T08:15:00Z" },
    { id: 5, status: "available", licensePlate: null, updatedAt: "2025-09-20T08:20:00Z" },
    { id: 6, status: "available", licensePlate: null, updatedAt: "2025-09-20T08:25:00Z" },
    { id: 7, status: "occupied", licensePlate: "29A-1234", updatedAt: "2025-09-20T09:00:00Z" },
    { id: 8, status: "occupied", licensePlate: "31C-4321", updatedAt: "2025-09-20T08:30:00Z" },
    { id: 9, status: "booked", licensePlate: null, updatedAt: "2025-09-20T07:45:00Z" },
    { id: 10, status: "available", licensePlate: null, updatedAt: "2025-09-20T08:40:00Z" },
    { id: 11, status: "available", licensePlate: null, updatedAt: "2025-09-20T08:45:00Z" },
    { id: 12, status: "available", licensePlate: null, updatedAt: "2025-09-20T08:50:00Z" },
    { id: 13, status: "booked", licensePlate: null, updatedAt: "2025-09-19T21:15:00Z" },
    { id: 14, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:00:00Z" },
    { id: 15, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:05:00Z" },
    { id: 16, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:10:00Z" },
    { id: 17, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:15:00Z" },
    { id: 18, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:20:00Z" },
    { id: 19, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:25:00Z" },
    { id: 20, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:30:00Z" },
    { id: 21, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:35:00Z" },
    { id: 22, status: "booked", licensePlate: null, updatedAt: "2025-09-20T10:00:00Z" },
    { id: 23, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:40:00Z" },
    { id: 24, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:45:00Z" },
    { id: 25, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:50:00Z" },
    { id: 26, status: "occupied", licensePlate: "30B-5678", updatedAt: "2025-09-20T06:50:00Z" },
    { id: 27, status: "available", licensePlate: null, updatedAt: "2025-09-20T09:55:00Z" },
    { id: 28, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:00:00Z" },
    { id: 29, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:05:00Z" },
    { id: 30, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:10:00Z" },
    { id: 31, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:15:00Z" },
    { id: 32, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:20:00Z" },
    { id: 33, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:25:00Z" },
    { id: 34, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:30:00Z" },
    { id: 35, status: "booked", licensePlate: null, updatedAt: "2025-09-19T18:20:00Z" },
    { id: 36, status: "booked", licensePlate: null, updatedAt: "2025-09-19T19:05:00Z" },
    { id: 37, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:35:00Z" },
    { id: 38, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:40:00Z" },
    { id: 39, status: "booked", licensePlate: null, updatedAt: "2025-09-20T11:30:00Z" },
    { id: 40, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:45:00Z" },
    { id: 41, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:50:00Z" },
    { id: 42, status: "available", licensePlate: null, updatedAt: "2025-09-20T10:55:00Z" },
    { id: 43, status: "available", licensePlate: null, updatedAt: "2025-09-20T11:00:00Z" },
    { id: 44, status: "available", licensePlate: null, updatedAt: "2025-09-20T11:05:00Z" },
    { id: 45, status: "available", licensePlate: null, updatedAt: "2025-09-20T11:10:00Z" },
    { id: 46, status: "available", licensePlate: null, updatedAt: "2025-09-20T11:15:00Z" },
    { id: 47, status: "available", licensePlate: null, updatedAt: "2025-09-20T11:20:00Z" },
    { id: 48, status: "available", licensePlate: null, updatedAt: "2025-09-20T11:25:00Z" },
];


const ParkingMapPage = () => {
    const [slots, setSlots] = useState(slotPositions);
    const [openSlotInfo, setOpenSlotInfo] = useState(false);
    const [openCheckIn, setOpenCheckIn] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const mapWidth = 840;
    const mapHeight = 610;
    const availableWidth = window.innerWidth - drawerWidth;
    const scale = (availableWidth / mapWidth) * 0.8;

    useEffect(() => {
        const fetchSlotStates = async () => {
            const res = await getParkingSlots();
            if (res?.status === 200 && res?.data?.data) {
                const stateMap = {};
                const slotStates = res.data.data
                slotStates.forEach(s => {
                    stateMap[s.id] = s;
                });
                const mergedSlots = slotPositions.map(pos => ({
                    ...pos,
                    ...(stateMap[pos.id] || {})
                }));

                setSlots(mergedSlots);
            }
        };

        fetchSlotStates();
        // Giả lập API call với delay
        // setTimeout(() => {
        //     // Tạo object map từ slotStatesFromAPI để truy cập nhanh theo id
        //     const stateMap = {};
        //     slotStatesFromAPI.forEach(s => {
        //         stateMap[s.id] = s;
        //     });

        //     // Gộp slotPositions + slotStates dựa theo id bằng object map
        //     const mergedSlots = slotPositions.map(pos => ({
        //         ...pos,
        //         ...(stateMap[pos.id] || {}) // lấy trạng thái từ map nếu có
        //     }));

        //     setSlots(mergedSlots);
        // }, 1000); // giả lập delay 1 giây
    }, []);

    const onSlotClick = (id) => {
        const slot = slots.find(s => s.id === id);
        setSelectedSlot(slot);
        setOpenSlotInfo(true);
    };

    const handleCheckIn = () => {
        setOpenCheckIn(true);
    };

    const handleCheckInSubmit = async (licensePlate) => {
        const res = await checkIn(selectedSlot.id, { licensePlate });
        if (res.status === 200) {
            const updatedSlot = res?.data?.data;

            setSlots(prevSlots =>
                prevSlots.map(slot =>
                    slot.id === updatedSlot.id ? { ...slot, ...updatedSlot } : slot
                )
            );

            toast.success("Check in thành công.");
            setOpenSlotInfo(false);
        } else {
            toast.error("Có lỗi xảy ra khi check in.");
        }
        setOpenCheckIn(false);
    };

    const handleCheckOut = async () => {
        const res = await checkOut(selectedSlot.id);
        if (res.status === 200) {
            const updatedSlot = res?.data?.data;

            setSlots(prevSlots =>
                prevSlots.map(slot =>
                    slot.id === updatedSlot.id ? { ...slot, ...updatedSlot } : slot
                )
            );

            toast.success("Check out thành công.");
            setOpenSlotInfo(false);
        } else {
            toast.error("Có lỗi xảy ra khi check out.");
        }
    };

    const handleCancel = async () => {
        const res = await cancelBooking(selectedSlot.id);
        if (res.status === 200) {
            const updatedSlot = res?.data?.data;

            setSlots(prevSlots =>
                prevSlots.map(slot =>
                    slot.id === updatedSlot.id ? { ...slot, ...updatedSlot } : slot
                )
            );

            toast.success("Huỷ đặt chỗ thành công.");
            setOpenSlotInfo(false);
        } else {
            toast.error("Có lỗi xảy ra khi huỷ đặt chỗ.");
        }
    };

    return (
        <Box sx={{ ml: 4, mt: 4, width: "100%", height: "100%" }}>
            <Typography variant="h6">Sơ đồ bãi xe</Typography>
            <ParkingMap
                mapWidth={mapWidth}
                mapHeight={mapHeight}
                scale={scale}
                slots={slots}
                isAdmin={true}
                onSlotClick={onSlotClick}
            />
            <ParkingSlotDialog
                open={openSlotInfo}
                slot={selectedSlot}
                onClose={() => setOpenSlotInfo(false)}
                onCheckIn={handleCheckIn}
                onCancel={handleCancel}
                onCheckOut={handleCheckOut}
            />
            <CheckInDialog
                open={openCheckIn}
                onClose={() => setOpenCheckIn(false)}
                onSubmit={handleCheckInSubmit}
            />
        </Box>
    );
};

export default ParkingMapPage;
