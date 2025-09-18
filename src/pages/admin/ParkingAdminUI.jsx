import React, { useState } from "react";
import { Box, Button, Drawer, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Rnd } from "react-rnd";

const statusColors = {
    available: "rgba(0,200,0,0.3)",
    reserved: "rgba(255,200,0,0.3)",
    occupied: "rgba(200,0,0,0.3)",
};

export default function AdminDashboard() {
    const [slots, setSlots] = useState([
        { id: 1, x: 50, y: 50, w: 80, h: 120, status: "available", plate: null },
        { id: 2, x: 200, y: 100, w: 80, h: 120, status: "occupied", plate: "29A-12345" },
    ]);

    const [sessions, setSessions] = useState([
        { id: 101, slotId: 2, licensePlate: "29A-12345", startTime: "2025-09-18 09:00", endTime: null, status: "checked-in" },
    ]);

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [newPlate, setNewPlate] = useState("");

    const handleOpenDrawer = (slot) => {
        setSelectedSlot(slot);
        setDrawerOpen(true);
    };

    const handleAddCar = () => {
        if (!newPlate) return;
        setSlots(slots.map(s =>
            s.id === selectedSlot.id ? { ...s, status: "occupied", plate: newPlate } : s
        ));
        setSessions([...sessions, {
            id: Date.now(),
            slotId: selectedSlot.id,
            licensePlate: newPlate,
            startTime: new Date().toLocaleString(),
            endTime: null,
            status: "checked-in",
        }]);
        setNewPlate("");
        setDrawerOpen(false);
    };

    const handleCheckOut = (sessionId) => {
        const session = sessions.find(s => s.id === sessionId);
        setSessions(sessions.map(s => s.id === sessionId ? { ...s, status: "checked-out", endTime: new Date().toLocaleString() } : s));
        setSlots(slots.map(s => s.id === session.slotId ? { ...s, status: "available", plate: null } : s));
    };

    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            {/* Parking Map */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Sơ đồ bãi đỗ</Typography>
                <Box sx={{ mt: 2, width: 600, height: 500, position: "relative", border: "2px dashed #ccc", background: "#f4f4f4" }}>
                    {slots.map(slot => (
                        <Rnd
                            key={slot.id}
                            size={{ width: slot.w, height: slot.h }}
                            position={{ x: slot.x, y: slot.y }}
                            bounds="parent"
                            onClick={() => handleOpenDrawer(slot)}
                            style={{
                                background: statusColors[slot.status],
                                border: "1px solid #333",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                        >
                            <Typography variant="caption">
                                {slot.plate || `Slot ${slot.id}`}
                            </Typography>
                        </Rnd>
                    ))}
                </Box>
            </Box>

            {/* Sessions */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Quản lý lượt gửi</Typography>
                <DataGrid
                    autoHeight
                    rows={sessions}
                    columns={[
                        { field: "id", headerName: "ID", width: 90 },
                        { field: "slotId", headerName: "Slot", width: 90 },
                        { field: "licensePlate", headerName: "Biển số", width: 120 },
                        { field: "startTime", headerName: "Bắt đầu", width: 180 },
                        { field: "endTime", headerName: "Kết thúc", width: 180 },
                        { field: "status", headerName: "Trạng thái", width: 120 },
                        {
                            field: "actions",
                            headerName: "Hành động",
                            width: 150,
                            renderCell: (params) => (
                                <Button
                                    size="small"
                                    variant="outlined"
                                    disabled={params.row.status !== "checked-in"}
                                    onClick={() => handleCheckOut(params.row.id)}
                                >
                                    Check-out
                                </Button>
                            )
                        }
                    ]}
                />
            </Box>

            {/* Slot Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    {selectedSlot && (
                        <>
                            <Typography variant="h6">Slot {selectedSlot.id}</Typography>
                            <Typography>Trạng thái: {selectedSlot.status}</Typography>
                            <Typography>Biển số: {selectedSlot.plate || "—"}</Typography>

                            {selectedSlot.status === "available" && (
                                <Box sx={{ mt: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Nhập biển số"
                                        value={newPlate}
                                        onChange={(e) => setNewPlate(e.target.value)}
                                    />
                                    <Button fullWidth variant="contained" sx={{ mt: 1 }} onClick={handleAddCar}>
                                        Thêm xe vào chỗ
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
}
