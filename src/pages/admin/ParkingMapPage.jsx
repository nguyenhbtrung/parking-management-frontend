import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { drawerWidth } from "../../appConst";
import ParkingMap from "../../components/ParkingMap";
import { slotPositions } from "../../data/slotPositions";

// --- Mảng trạng thái 48 slot (giả lập API) ---
const slotStatesFromAPI = [
    { id: 1, status: "empty", plate: null },
    { id: 2, status: "empty", plate: null },
    { id: 3, status: "empty", plate: null },
    { id: 4, status: "empty", plate: null },
    { id: 5, status: "empty", plate: null },
    { id: 6, status: "empty", plate: null },
    { id: 7, status: "occupied", plate: "29A-1234" },
    { id: 8, status: "occupied", plate: null },
    { id: 9, status: "selected", plate: null },
    { id: 10, status: "empty", plate: null },
    { id: 11, status: "empty", plate: null },
    { id: 12, status: "empty", plate: null },
    { id: 13, status: "selected", plate: null },
    { id: 14, status: "empty", plate: null },
    { id: 15, status: "empty", plate: null },
    { id: 16, status: "empty", plate: null },
    { id: 17, status: "empty", plate: null },
    { id: 18, status: "empty", plate: null },
    { id: 19, status: "empty", plate: null },
    { id: 20, status: "empty", plate: null },
    { id: 21, status: "empty", plate: null },
    { id: 22, status: "selected", plate: null },
    { id: 23, status: "empty", plate: null },
    { id: 24, status: "empty", plate: null },
    { id: 25, status: "empty", plate: null },
    { id: 26, status: "occupied", plate: "30B-5678" },
    { id: 27, status: "empty", plate: null },
    { id: 28, status: "empty", plate: null },
    { id: 29, status: "empty", plate: null },
    { id: 30, status: "empty", plate: null },
    { id: 31, status: "empty", plate: null },
    { id: 32, status: "empty", plate: null },
    { id: 33, status: "empty", plate: null },
    { id: 34, status: "empty", plate: null },
    { id: 35, status: "selected", plate: null },
    { id: 36, status: "selected", plate: null },
    { id: 37, status: "empty", plate: null },
    { id: 38, status: "empty", plate: null },
    { id: 39, status: "selected", plate: null },
    { id: 40, status: "empty", plate: null },
    { id: 41, status: "empty", plate: null },
    { id: 42, status: "empty", plate: null },
    { id: 43, status: "empty", plate: null },
    { id: 44, status: "empty", plate: null },
    { id: 45, status: "empty", plate: null },
    { id: 46, status: "empty", plate: null },
    { id: 47, status: "empty", plate: null },
    { id: 48, status: "empty", plate: null },
];

const ParkingMapPage = () => {
    const [slots, setSlots] = useState([]); // state cuối cùng để truyền vào ParkingMap

    const mapWidth = 840;
    const mapHeight = 610;
    const availableWidth = window.innerWidth - drawerWidth;
    const scale = (availableWidth / mapWidth) * 0.8;

    useEffect(() => {
        // Giả lập API call với delay
        setTimeout(() => {
            // Tạo object map từ slotStatesFromAPI để truy cập nhanh theo id
            const stateMap = {};
            slotStatesFromAPI.forEach(s => {
                stateMap[s.id] = s;
            });

            // Gộp slotPositions + slotStates dựa theo id bằng object map
            const mergedSlots = slotPositions.map(pos => ({
                ...pos,
                ...(stateMap[pos.id] || {}) // lấy trạng thái từ map nếu có
            }));

            setSlots(mergedSlots);
        }, 1000); // giả lập delay 1 giây
    }, []);

    return (
        <Box sx={{ ml: 4, mt: 4, width: "100%", height: "100%" }}>
            <Typography variant="h6">Sơ đồ bãi xe</Typography>
            <ParkingMap
                mapWidth={mapWidth}
                mapHeight={mapHeight}
                scale={scale}
                slots={slots}
                isAdmin={true}
            />
        </Box>
    );
};

export default ParkingMapPage;
